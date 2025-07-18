import { Response } from 'express'
import { UserD } from '../db/models/user/user.model'
import { catchErrorResponse, SuccessResponse } from '../utils/Response'
import { AuthServices } from '../services/auth/auth.service'
import { MyRequest } from '../types/Express'
import authLogs from '../services/auth/auth.logs'
import { handleResponseConversion } from '../utils/handleResponseConversion'
import { generateVerificationCode } from '../utils/generateVerificationCode'
import { addMinutes, isBefore } from 'date-fns'
// import { FRONT_URL } from '../config/EnvProvider'
// import { sendEmailVerificationTemplate } from '../emails'

export const VerifyEmail = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const { verificationCode } = req.params
    const { email } = req.body
    const result = await AuthServices.verifyEmail(email, verificationCode)
    handleResponseConversion(res, result)
  } catch (err) {
    const resp = authLogs.LOGIN_ERROR_GENERIC
    catchErrorResponse(err, res, resp)
  }
}

export const resendVerificationEmail = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const { email } = req.params
    const result = await AuthServices.resendVEmailerificationCode(email)
    handleResponseConversion(res, result)
  } catch (err) {
    const resp = authLogs.LOGIN_ERROR_GENERIC
    catchErrorResponse(err, res, resp)
  }
}
export const SignIn = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const { email, password } = req.body
    const result = await AuthServices.login(email, password)
    handleResponseConversion(res, result)
  } catch (err) {
    const resp = authLogs.LOGIN_ERROR_GENERIC
    catchErrorResponse(err, res, resp)
  }
}

export const Skip = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const { email } = req.body
    const skipToken = req.params.skipToken
    const result = await AuthServices.skipLogin(email, skipToken)
    handleResponseConversion(res, result)
  } catch (err) {
    const resp = authLogs.LOGIN_ERROR_GENERIC
    catchErrorResponse(err, res, resp)
  }
}

export const SignUp = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const { email, password, firstName, lastName, lang } = req.body
    const result = await AuthServices.register({
      email,
      password,
      firstName,
      lastName,
      lang: lang as 'en' | 'ar' | 'fr',
    })

    handleResponseConversion(res, result)
  } catch (err) {
    const resp = authLogs.REGISTER_ERROR_GENERIC
    catchErrorResponse(err, res, resp)
  }
}
export const ForgetPassword = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const { email } = req.body
    const result = await AuthServices.forgetPassword(email)
    handleResponseConversion(res, result)
  } catch (err) {
    const resp = authLogs.RESET_ERROR_GENERIC
    catchErrorResponse(err, res, resp)
  }
}

export const ResetPassword = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const { email, password } = req.body
    const { code } = req.params
    const result = await AuthServices.handleResetPassword(email, password, +code)
    handleResponseConversion(res, result)
  } catch (err) {
    const resp = authLogs.RESET_ERROR_GENERIC
    catchErrorResponse(err, res, resp)
  }
}

export const VerifyResetpassword = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const { code } = req.params
    const email = req.body.email
    const result = await AuthServices.HandleVerifyResetPassword(+code, email)
    handleResponseConversion(res, result)
  } catch (err) {
    const resp = authLogs.RESET_ERROR_GENERIC
    catchErrorResponse(err, res, resp)
  }
}

export const AuthBack = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const result = await AuthServices.authBack(req.user!)
    handleResponseConversion(res, result)
  } catch (err) {
    const resp = authLogs.AUTH_ERROR_GENERIC
    catchErrorResponse(err, res, resp)
  }
}

export const AuthLogout = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const result = await AuthServices.logout(req.user!, res)
    handleResponseConversion(res, result)
  } catch (err) {
    const resp = authLogs.LOGIN_ERROR_GENERIC
    catchErrorResponse(err, res, resp)
  }
}

export const isUserLoggedIn = async (req: MyRequest<UserD>, res: Response) => {
  const user = req.user
  const today = new Date()
  const verificationCode = generateVerificationCode()
  let emailVerificationCodeExpiry = null
  if (
    user &&
    !user.isEmailVerified &&
    (!user.emailVerificationCode ||
      !user.emailVerificationCodeExpiry ||
      (user.emailVerificationCodeExpiry &&
        isBefore(new Date(user.emailVerificationCodeExpiry), today)))
  ) {
    // const link = `${FRONT_URL}/email-verification`
    emailVerificationCodeExpiry = addMinutes(today, 3)

    // await sendEmailVerificationTemplate(
    //   user.lang || 'en',
    //   user.email,
    //   user.firstName,
    //   user.lastName,
    //   link,
    //   `${verificationCode}`
    // )
    user.emailVerificationCode = verificationCode
    user.emailVerificationCodeExpiry = emailVerificationCodeExpiry
    await user.save()
  }
  return SuccessResponse(res, 200, user?.Optimize(), 'user is logged in', '200')
}

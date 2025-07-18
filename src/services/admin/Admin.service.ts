import authLogs, { IAuthLogs, authLogger } from './admin.logs'
import { formatString } from '../../utils/Strings'
import { Sign } from '../../utils/jwt'
import { HttpCodes } from '../../config/Errors'
import { ErrorResponseC, SuccessResponseC, throwLocalizedErrorResponse } from '../services.response'
import { Response } from 'express'
import { getCookiesSettings } from '../../utils/Function'
import { randomBytes } from 'crypto'
import { hash } from 'bcrypt'
import { addMinutes } from 'date-fns'
// import { sendResetPasswordEmailTemplate } from '../../emails'
// import { FRONT_URL } from '../../config/EnvProvider'
import { AdminModel } from '../../db/models/admin/admin.model'
export class AdminServices {
  static executeLogin = async (
    email: string,
    password: string,
    stay: boolean,
    res: Response
  ): Promise<ResponseT> => {
    try {
      const user = await AdminModel.findOne({ email })
      if (user) {
        const isPasswordMatch = await user.comparePasswords(password)
        if (isPasswordMatch) {
          const token = Sign({
            _id: user._id.toString(),
            email: email,
            expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
            role: 'superAdmin',
          })

          const resp: ICode<IAuthLogs> = authLogs.LOGIN_SUCCESS
          const msg = formatString(resp.message, user.toObject())
          authLogger.info(msg, { type: resp.type })
          res.cookie('token', token, getCookiesSettings(stay))

          return new SuccessResponseC(
            resp.type,
            { ...user.Optimize(), token: token },
            msg,
            HttpCodes.Accepted.code
          )
        }
        const msg = formatString(authLogs.LOGIN_ERROR_INCORRECT_PASSWORD_FOUND.message, { email })
        authLogger.error(msg)
        return throwLocalizedErrorResponse(
          authLogs.LOGIN_ERROR_INCORRECT_PASSWORD_FOUND,
          HttpCodes.Unauthorized.code,
          authLogger,
          { email: email }
        )
      }
      const msg = formatString(authLogs.LOGIN_ERROR_EMAIL_NOT_FOUND.message, {
        email,
      })
      authLogger.error(msg)
      return new ErrorResponseC(
        authLogs.LOGIN_ERROR_EMAIL_NOT_FOUND.type,
        HttpCodes.NotFound.code,
        msg
      )
    } catch (err) {
      const msg = formatString(authLogs.LOGIN_ERROR_GENERIC.message, {
        error: (err as Error)?.message || '',
        email,
      })
      authLogger.error(msg, err as Error)
      return new ErrorResponseC(
        authLogs.LOGIN_ERROR_GENERIC.type,
        HttpCodes.InternalServerError.code,
        msg
      )
    }
  }

  static executeRegister = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    stay: boolean,
    res: Response
  ): Promise<ResponseT> => {
    try {
      const userExist = await AdminModel.findOne({
        $or: [{ email: email }],
      })
      if (userExist) {
        const msg = formatString(authLogs.REGISTER_ERROR_EMAIL_EXIST.message, { email: email })
        authLogger.error(msg)
        return new ErrorResponseC(
          authLogs.REGISTER_ERROR_EMAIL_EXIST.type,
          HttpCodes.BadRequest.code,
          msg
        )
      }
      const admin = new AdminModel({
        email,
        password,
        firstName,
        lastName,
        role: 'superAdmin',
      })
      await admin.save()
      const token = Sign({
        _id: admin._id.toString(),
        email: email,
        expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        role: 'superAdmin',
      })
      res.cookie('token', token, getCookiesSettings(stay))
      const resp: ICode<IAuthLogs> = authLogs.REGISTER_SUCCESS
      const msg = formatString(resp.message, admin.toObject())
      authLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(
        resp.type,
        { ...admin.Optimize(), token: token },
        msg,
        HttpCodes.Created.code
      )
    } catch (err) {
      const msg = formatString(authLogs.REGISTER_ERROR_GENERIC.message, {
        error: (err as Error)?.message || '',
        email,
      })
      authLogger.error(msg, err as Error)
      return new ErrorResponseC(
        authLogs.REGISTER_ERROR_GENERIC.type,
        HttpCodes.InternalServerError.code,
        msg
      )
    }
  }
  static executeforgetPassword = async (email: string): Promise<ResponseT> => {
    try {
      const user = await AdminModel.findOne({
        email,
      })
      if (!user) {
        const msg = formatString(authLogs.USER_NOT_FOUND.message, {
          email,
        })
        authLogger.error(msg)
        return new ErrorResponseC(authLogs.USER_NOT_FOUND.type, HttpCodes.NotFound.code, msg)
      }
      const resetCode = Math.floor(100000 + Math.random() * 900000)

      const SkipToken = randomBytes(14).toString('hex')
      user.passwordResetToken = resetCode
      user.passwordResetExpiry = addMinutes(new Date().getTime(), 7).getTime()
      user.skipToken = SkipToken
      await AdminModel.findByIdAndUpdate(user._id, user, {
        new: true,
        runValidators: true,
      })
      // const emailInput: EmailArgs = {
      //   email: email,
      //   subject: "Reset your Password",
      //   text: `here is your password reset code :${resetCode} this code will expire in 5 minutes you can reset your password in this link : ${FRONT_URL_DEV}/optVerification?email=${email}`,
      // };
      // await sendMail(emailInput);
      // await sendResetPasswordEmailTemplate(
      //   'en',
      //   `${email}`,
      //   `${user.firstName}`,
      //   `${user.lastName}`,
      //   `${FRONT_URL}/otp-verification`,
      //   `${resetCode}`
      // )

      const resp: ICode<IAuthLogs> = authLogs.RESET_PASSWORD_SENT_SUCCESS
      const msg = formatString(resp.message, user.toObject())
      authLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(
        resp.type,
        { expireTime: user.passwordResetExpiry },
        msg,
        HttpCodes.Accepted.code
      )
    } catch (err) {
      const msg = formatString(authLogs.RESET_ERROR_GENERIC.message, {
        error: (err as Error)?.message || '',
        email,
      })
      authLogger.error(msg, err as Error)
      return new ErrorResponseC(
        authLogs.RESET_ERROR_GENERIC.type,
        HttpCodes.InternalServerError.code,
        msg
      )
    }
  }

  static executeHandleResetPassword = async (
    email: string,
    password: string,
    passwordResetToken: number
  ): Promise<ResponseT> => {
    try {
      const user = await AdminModel.findOne({
        passwordResetToken: +passwordResetToken,
        email,
      })
      if (!user) {
        authLogger.error(authLogs.RESET_TOKEN_NOTFOUND_ERROR.message)
        return new ErrorResponseC(
          authLogs.USER_NOT_FOUND.type,
          HttpCodes.NotFound.code,
          authLogs.RESET_TOKEN_NOTFOUND_ERROR.message
        )
      }
      const now = new Date().valueOf()
      const passwordResetExpiry = user!.passwordResetExpiry as number
      if (now - passwordResetExpiry > 0) {
        const msg = formatString(authLogs.RESET_PASSWORD_TOKEN_EXPIRED_ERROR.message, {
          email: user.email,
        })
        authLogger.error(msg)
        return new ErrorResponseC(
          authLogs.REGISTER_ERROR_EMAIL_EXIST.type,
          HttpCodes.BadRequest.code,
          msg
        )
      }

      user.password = await hash(password, 10)
      user.passwordResetToken = undefined
      user.passwordResetExpiry = undefined
      user.skipToken = undefined
      await AdminModel.findByIdAndUpdate(user._id, user, {
        new: true,
        runValidators: true,
      })
      const resp: ICode<IAuthLogs> = authLogs.RESET_PASSWORD_SUCCESS
      const msg = formatString(resp.message, user.toObject())
      authLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, null, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const msg = formatString(authLogs.RESET_ERROR_GENERIC.message, {
        error: (err as Error)?.message || '',
      })
      authLogger.error(msg, err as Error)
      return new ErrorResponseC(
        authLogs.RESET_ERROR_GENERIC.type,
        HttpCodes.InternalServerError.code,
        msg
      )
    }
  }

  static executeHandleVerifyResetPassword = async (
    passwordResetToken: number,
    email: string
  ): Promise<ResponseT> => {
    try {
      const user = await AdminModel.findOne({
        passwordResetToken,
        email,
      })
      if (!user) {
        authLogger.error(authLogs.RESET_TOKEN_NOTFOUND_ERROR.message)
        return new ErrorResponseC(
          authLogs.USER_NOT_FOUND.type,
          HttpCodes.NotFound.code,
          authLogs.RESET_TOKEN_NOTFOUND_ERROR.message
        )
      }
      const now = new Date().valueOf()
      const passwordResetExpiry = user!.passwordResetExpiry as number
      if (now - passwordResetExpiry > 0) {
        const msg = formatString(authLogs.RESET_PASSWORD_TOKEN_EXPIRED_ERROR.message, {
          email: user.email,
        })
        authLogger.error(msg)
        return new ErrorResponseC(
          authLogs.REGISTER_ERROR_EMAIL_EXIST.type,
          HttpCodes.BadRequest.code,
          msg
        )
      }

      const resp: ICode<IAuthLogs> = authLogs.CHECK_RESET_PASSWORD_SUCCESS
      const msg = formatString(resp.message, user.toObject())
      authLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(
        resp.type,
        {
          exipres: user!.passwordResetExpiry,
          verificationCode: user!.passwordResetToken,
          skipToken: user!.skipToken,
        },
        msg,
        HttpCodes.Accepted.code
      )
    } catch (err) {
      const msg = formatString(authLogs.RESET_ERROR_GENERIC.message, {
        error: (err as Error)?.message || '',
      })
      authLogger.error(msg, err as Error)
      return throwLocalizedErrorResponse(
        authLogs.RESET_ERROR_GENERIC,
        HttpCodes.InternalServerError.code,
        authLogger,
        { error: (err as Error)?.message || '' }
      )
    }
  }
}

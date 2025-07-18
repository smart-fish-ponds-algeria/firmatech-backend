import { UserD, UserModel } from '../../db/models/user/user.model'
import authLogs, { IAuthLogs, authLogger } from './auth.logs'
import { formatString } from '../../utils/Strings'
import { Sign } from '../../utils/jwt'
import { HttpCodes } from '../../config/Errors'
import { ErrorResponseC, SuccessResponseC, throwLocalizedErrorResponse } from '../services.response'
import { Response } from 'express'
import { randomBytes } from 'crypto'
import { hash } from 'bcrypt'
import { addMinutes, isBefore } from 'date-fns'
// import { sendEmailVerificationTemplate, sendResetPasswordEmailTemplate } from '../../emails'
import { FRONT_URL } from '../../config/EnvProvider'
import { generateVerificationCode } from '../../utils/generateVerificationCode'
import { sendEmailVerificationTemplate } from '../../emails/emailVerificationTemplate/app'
export class AuthServices {
  static verifyEmail = async (email: string, emailVerificationCode: string) => {
    try {
      const user = await UserModel.findOne({
        email: { $regex: new RegExp(`^${email}$`, 'i') },
        emailVerificationCode,
      })
      if (!user) {
        const resp = authLogs.INVALID_VERIFICATION_CODE
        throw throwLocalizedErrorResponse(resp, HttpCodes.BadRequest.code, authLogger)
      }
      const today = new Date()
      if (
        user.emailVerificationCodeExpiry &&
        isBefore(new Date(user.emailVerificationCodeExpiry), today)
      ) {
        const resp = authLogs.EMAIL_VERIFICATION_CODE_EXPIRED
        throw throwLocalizedErrorResponse(resp, HttpCodes.BadRequest.code, authLogger)
      }
      user.isEmailVerified = true
      user.emailVerificationCode = undefined
      user.emailVerificationCodeExpiry = undefined
      await user.save()
      const resp = authLogs.EMAIL_VERIFIED_SUCCESS

      return new SuccessResponseC(resp.type, user.Optimize(), resp.message, HttpCodes.Accepted.code)
    } catch (err) {
      if (err instanceof ErrorResponseC) throw err
      const resp = authLogs.EMAIL_VERIFIED_ERROR
      throw throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, authLogger, {
        error: (err as Error)?.message || '',
        email,
      })
    }
  }

  static resendVEmailerificationCode = async (email: string) => {
    try {
      const user = await this.findUserByEmail(email)
      if (!user) {
        const resp = authLogs.USER_NOT_FOUND
        throw throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, authLogger)
      }

      const today = new Date()
      const verificationCode = generateVerificationCode()
      let emailVerificationCodeExpiry = null
      if (
        !user.emailVerificationCode ||
        !user.emailVerificationCodeExpiry ||
        (user.emailVerificationCodeExpiry &&
          isBefore(new Date(user.emailVerificationCodeExpiry), today))
      ) {
        const link = `${FRONT_URL}/email-verification`
        console.log('link ', link)
        emailVerificationCodeExpiry = addMinutes(today, 3)

        // await sendEmailVerificationTemplate(
        //   user.lang || 'en',
        //   email,
        //   user.firstName,
        //   user.lastName,
        //   link,
        //   `${verificationCode}`
        // )
        user.emailVerificationCode = verificationCode
        user.emailVerificationCodeExpiry = emailVerificationCodeExpiry
        await user.save()
      }

      const resp: ICode<IAuthLogs> = authLogs.EMAIL_VERIFICATION_SENT_SUCCESS
      const msg = formatString(resp.message, user.toObject())
      authLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(
        resp.type,
        { expirationTime: emailVerificationCodeExpiry },
        msg,
        HttpCodes.OK.code
      )
    } catch (err) {
      if (err instanceof ErrorResponseC) throw err
      const resp = authLogs.REGISTER_ERROR_GENERIC
      throw throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, authLogger, {
        error: (err as Error)?.message || '',
        email,
      })
    }
  }

  static findUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } })
    return user
  }
  static login = async (email: string, password: string) => {
    try {
      const user = await this.findUserByEmail(email)
      if (user) {
        const isPasswordMatch = await user.comparePasswords(password)
        if (isPasswordMatch) {
          const token = Sign({
            _id: user._id.toString(),
            email: email,
            expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
          })

          const today = new Date()
          const verificationCode = generateVerificationCode()
          let emailVerificationCodeExpiry = null
          if (
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
            //   email,
            //   user.firstName,
            //   user.lastName,
            //   link,
            //   `${verificationCode}`
            // )
            user.emailVerificationCode = verificationCode
            user.emailVerificationCodeExpiry = emailVerificationCodeExpiry
            await user.save()
          }

          // if (!user.isEmailVerified) {
          //   const resp = authLogs.EMAIL_NOT_VERIFIED
          //   throw throwLocalizedErrorResponse(resp, HttpCodes.Unauthorized.code, authLogger)
          // }
          const resp: ICode<IAuthLogs> = authLogs.LOGIN_SUCCESS
          const msg = formatString(resp.message, user.toObject())
          authLogger.info(msg, { type: resp.type })
          // res.cookie("token", token, getCookiesSettings(stay));

          return new SuccessResponseC(
            resp.type,
            { ...user.Optimize(), token: token },
            msg,
            HttpCodes.Accepted.code
          )
        }
        const resp = authLogs.LOGIN_ERROR_INCORRECT_PASSWORD_FOUND
        throw throwLocalizedErrorResponse(resp, HttpCodes.BadRequest.code, authLogger, { email })
      }
      const resp = authLogs.LOGIN_ERROR_EMAIL_NOT_FOUND
      throw throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, authLogger, { email })
    } catch (err) {
      if (err instanceof ErrorResponseC) throw err
      const resp = authLogs.LOGIN_ERROR_GENERIC
      throw throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, authLogger, {
        error: (err as Error)?.message || '',
        email,
      })
    }
  }

  static skipLogin = async (email: string, skipToken: string) => {
    try {
      const user = await UserModel.findOne({
        email: { $regex: new RegExp(`^${email}$`, 'i') },
        skipToken,
      })
      if (user) {
        const token = Sign({
          _id: user._id.toString(),
          email: email,
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        })

        const resp: ICode<IAuthLogs> = authLogs.LOGIN_SUCCESS
        const msg = formatString(resp.message, user.toObject())
        authLogger.info(msg, { type: resp.type })
        return new SuccessResponseC(
          resp.type,
          { ...user.Optimize(), token: token },
          msg,
          HttpCodes.Accepted.code
        )
      }
      const resp = authLogs.USER_NOT_FOUND
      throw throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, authLogger, {
        email,
      })
    } catch (err) {
      if (err instanceof ErrorResponseC) throw err
      const resp = authLogs.LOGIN_ERROR_GENERIC
      throw throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, authLogger, {
        error: (err as Error)?.message || '',
        email,
      })
    }
  }
  static register = async ({
    email,
    password,
    firstName,
    lastName,
    lang,
  }: {
    email: string
    password: string
    firstName: string
    lastName: string
    lang?: 'en' | 'fr' | 'ar'
  }) => {
    try {
      const userExist = await UserModel.findOne(
        { email: email },
        {},
        { collation: { locale: 'en', strength: 2 } }
      )
      if (userExist) {
        let resp = authLogs.REGISTER_ERROR_EMAIL_EXIST
        const formatedString = { email: email }
        throw throwLocalizedErrorResponse(
          resp,
          HttpCodes.BadRequest.code,
          authLogger,
          formatedString
        )
      }

      const verificationCode = generateVerificationCode()
      const emailVerificationCodeExpiry = addMinutes(new Date(), 3)
      const link = `${FRONT_URL}/email-verification/${verificationCode}`

      await sendEmailVerificationTemplate(
        lang || 'en',
        email,
        firstName,
        lastName,
        link,
        `${verificationCode}`
      )
      const today = new Date()

      const user = new UserModel({
        emailVerificationCode: verificationCode,
        lastloggedIn: today,
        email: email.toLowerCase(),
        password,
        firstName,
        lastName,
        lang,
        emailVerificationCodeExpiry,
      })
      await user.save()
      const token = Sign({
        _id: user._id.toString(),
        email: email,
        expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      })

      const resp: ICode<IAuthLogs> = authLogs.REGISTER_SUCCESS
      const msg = formatString(resp.message, user.toObject())
      authLogger.info(msg, { type: resp.type })

      return new SuccessResponseC(
        resp.type,
        { ...user.Optimize(), token },
        msg,
        HttpCodes.Created.code
      )
    } catch (err) {
      if (err instanceof ErrorResponseC) throw err
      const resp = authLogs.REGISTER_ERROR_GENERIC
      throw throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, authLogger, {
        error: (err as Error)?.message || '',
        email,
      })
    }
  }
  static authBack = async (user: UserD) => {
    try {
      const msg = formatString(authLogs.AUTH_BACK.message, {
        email: user.email,
        username: user.firstName + user.lastName,
      })
      authLogger.info(msg, { type: authLogs.AUTH_BACK.type })
      Sign({
        _id: user.id.toString(),
        email: user.email,
        expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      })
      // res.cookie("token", token, getCookiesSettings(stay));
      return new SuccessResponseC(
        authLogs.AUTH_BACK.type,
        user.Optimize(),
        msg,
        HttpCodes.Accepted.code
      )
    } catch (err) {
      if (err instanceof ErrorResponseC) throw err
      const resp = authLogs.AUTH_ERROR_GENERIC
      throw throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, authLogger, {
        error: (err as Error)?.message || '',
        email: user.email,
      })
    }
  }

  static logout = async (user: UserD, res: Response) => {
    try {
      const msg = formatString(authLogs.AUTH_LOGOUT.message, {
        email: user.email,
        username: user.lastName + user.firstName,
      })
      authLogger.info(msg, { type: authLogs.AUTH_LOGOUT.type })
      res.clearCookie('token', {
        domain: '.vercel.app',
        path: '/',
        sameSite: 'none',
        secure: true,
      })
      res.clearCookie('token', { sameSite: 'none', secure: true })
      res.clearCookie('token')
      return new SuccessResponseC(
        authLogs.AUTH_LOGOUT.type,
        user.Optimize(),
        msg,
        HttpCodes.Accepted.code
      )
    } catch (err) {
      if (err instanceof ErrorResponseC) throw err
      const resp = authLogs.AUTH_ERROR_GENERIC
      throw throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, authLogger, {
        error: (err as Error)?.message || '',
        email: user.email,
      })
    }
  }

  static forgetPassword = async (email: string) => {
    try {
      const user = await this.findUserByEmail(email)
      if (!user) {
        const resp = authLogs.LOGIN_ERROR_EMAIL_NOT_FOUND
        throw throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, authLogger, {
          email,
        })
      }

      const resetOTPCode = Math.floor(100000 + Math.random() * 900000)

      const SkipToken = randomBytes(14).toString('hex')
      user.passwordResetToken = resetOTPCode
      user.passwordResetExpiry = addMinutes(new Date().getTime(), 3).getTime()
      user.skipToken = SkipToken
      await UserModel.findByIdAndUpdate(user._id, user, {
        new: true,
        runValidators: true,
      })
      // await sendResetPasswordEmailTemplate(
      //   user.lang || 'en',
      //   email,
      //   user.firstName,
      //   user.lastName,
      //   `${FRONT_URL}/otp-verification`,
      //   `${resetOTPCode}`
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
      if (err instanceof ErrorResponseC) throw err
      const resp = authLogs.RESET_ERROR_GENERIC
      throw throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, authLogger, {
        error: (err as Error)?.message || '',
        email: email,
      })
    }
  }

  static handleResetPassword = async (
    email: string,
    password: string,
    passwordResetToken: number
  ) => {
    try {
      const user = await UserModel.findOne({
        passwordResetToken: +passwordResetToken,
        email: { $regex: new RegExp(`^${email}$`, 'i') },
      })
      if (!user) {
        const resp = authLogs.RESET_TOKEN_NOTFOUND_ERROR
        throw throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, authLogger)
      }
      const now = new Date().valueOf()
      const passwordResetExpiry = user!.passwordResetExpiry as number
      if (now - passwordResetExpiry > 0) {
        const resp = authLogs.RESET_PASSWORD_TOKEN_EXPIRED_ERROR
        throw throwLocalizedErrorResponse(resp, HttpCodes.BadRequest.code, authLogger)
      }

      user.password = await hash(password, 10)
      user.passwordResetToken = undefined
      user.passwordResetExpiry = undefined
      user.skipToken = undefined
      await UserModel.findByIdAndUpdate(user._id, user, {
        new: true,
        runValidators: true,
      })
      const resp: ICode<IAuthLogs> = authLogs.RESET_PASSWORD_SUCCESS
      const msg = formatString(resp.message, user.toObject())
      authLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, null, msg, HttpCodes.Accepted.code)
    } catch (err) {
      if (err instanceof ErrorResponseC) throw err
      const resp = authLogs.RESET_ERROR_GENERIC
      throw throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, authLogger, {
        error: (err as Error)?.message || '',
      })
    }
  }

  static HandleVerifyResetPassword = async (passwordResetToken: number, email: string) => {
    try {
      const user = await UserModel.findOne({
        passwordResetToken,
        email: { $regex: new RegExp(`^${email}$`, 'i') },
      })
      if (!user) {
        const resp = authLogs.RESET_TOKEN_NOTFOUND_ERROR
        throw throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, authLogger)
      }
      const now = new Date().valueOf()
      const passwordResetExpiry = user!.passwordResetExpiry as number
      if (now - passwordResetExpiry > 0) {
        const resp = authLogs.RESET_PASSWORD_TOKEN_EXPIRED_ERROR
        throw throwLocalizedErrorResponse(resp, HttpCodes.BadRequest.code, authLogger, {
          email: user.email,
        })
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
      if (err instanceof ErrorResponseC) throw err
      const resp = authLogs.RESET_ERROR_GENERIC
      throw throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, authLogger, {
        error: (err as Error)?.message || '',
      })
    }
  }
}

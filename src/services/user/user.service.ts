import { ObjectId } from 'mongoose'
import { HttpCodes } from '../../config/Errors'
import { UserModel } from '../../db/models/user/user.model'
import { formatString } from '../../utils/Strings'
import { ErrorResponseC, SuccessResponseC, throwLocalizedErrorResponse } from '../services.response'
import userLogs, { IUserLogs, userLogger } from './user.logs'
import bcrypt from 'bcrypt'
import { formatErrString } from '../../utils/shared/FormatErrStrings'
export class UserServices {
  static async getAllUsersAdmin() {
    try {
      const users = await UserModel.find()
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, users)
      userLogger.info(msg, { type: resp.type })
      const optimizedUsers = users.map((user) => user.Optimize())
      return new SuccessResponseC(resp.type, optimizedUsers, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async findUser(id: ObjectId) {
    try {
      const user = await UserModel.findById(id)
      if (!user) {
        const resp: ICode<IUserLogs> = userLogs.USER_NOT_FOUND
        throw throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, userLogger)
      }
      const resp: ICode<IUserLogs> = userLogs.GET_USER_SUCCESS
      const msg = formatString(resp.message, user.toObject())
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, user.Optimize(), msg, HttpCodes.Accepted.code)
    } catch (err) {
      if (err instanceof ErrorResponseC) throw err
      const resp: ICode<IUserLogs> = userLogs.GET_USER_ERROR_GENERIC
      throw throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, userLogger)
    }
  }
  static async executeFindUserByEmail(email: string) {
    try {
      const user = await UserModel.findOne({ email })
      if (!user) {
        const resp: ICode<IUserLogs> = userLogs.USER_NOT_FOUND
        return throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, userLogger)
      }
      const resp: ICode<IUserLogs> = userLogs.GET_USER_SUCCESS
      const msg = formatString(resp.message, user.toObject())
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, user.Optimize(), msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async executeDeleteUser(id: ObjectId) {
    try {
      const user = await UserModel.findByIdAndDelete(id)
      if (!user) {
        const resp: ICode<IUserLogs> = userLogs.USER_NOT_FOUND
        return throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, userLogger)
      }
      const resp: ICode<IUserLogs> = userLogs.DELETE_USER_SUCCESS
      const msg = formatString(resp.message, { data: null })
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, null, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.DELETE_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async updateUser({
    id,
    firstName,
    lastName,
    imgUrl,
    sub_stores_limit,
    store_limit,
  }: {
    id: ObjectId
    firstName?: string
    lastName?: string
    imgUrl?: string
    store_limit?: number
    sub_stores_limit?: number
  }) {
    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { firstName, lastName, imgUrl, store_limit, sub_stores_limit },
        { new: true }
      )
      if (!user) {
        const resp: ICode<IUserLogs> = userLogs.USER_NOT_FOUND
        throw throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, userLogger)
      }
      const resp: ICode<IUserLogs> = userLogs.USER_UPDATE_SUCCESS
      const msg = formatString(resp.message, user.toObject())
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, user.Optimize(), msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.USER_UPDATE_ERROR_GENERIC
      throw throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error)?.message || '',
      })
    }
  }
  static async updateUserPassword(id: ObjectId, password: string, newPassword: string) {
    try {
      const user = await UserModel.findById(id)
      if (!user) {
        const resp: ICode<IUserLogs> = userLogs.USER_NOT_FOUND
        return throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, userLogger)
      }
      const isPasswordMatch = await user.comparePasswords(password)
      if (isPasswordMatch) {
        const hashedpassword = await bcrypt.hash(newPassword, 10)
        const updatedUser = await UserModel.findByIdAndUpdate(
          id,
          { password: hashedpassword },
          { new: true }
        )
        const resp: ICode<IUserLogs> = userLogs.USER_UPDATE_SUCCESS
        const msg = formatString(resp.message, user.toObject())
        userLogger.info(msg, { type: resp.type })
        return new SuccessResponseC(
          resp.type,
          updatedUser!.Optimize(),
          msg,
          HttpCodes.Accepted.code
        )
      }
      const resp: ICode<IUserLogs> = userLogs.USER_UPDATE_ERROR_GENERIC
      userLogger.error('wrong password', { type: resp.type })
      return new ErrorResponseC(userLogs.USER_UPDATE_ERROR_GENERIC.type, 400, 'wrong password', {
        messageAr: 'كلمة المرور غير صحيحة',
        messageFr: 'mot de passe incorrect',
      })
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.USER_UPDATE_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }

  static async updateUserEmail(id: ObjectId, email: string, password: string) {
    try {
      const user = await UserModel.findById(id)
      if (!user) {
        const resp: ICode<IUserLogs> = userLogs.USER_NOT_FOUND
        return throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, userLogger)
      }
      const checkUserEmail = await UserModel.findOne({
        email: email,
      })
      if (checkUserEmail && (checkUserEmail as any)._id === id) {
        const resp: ICode<IUserLogs> = userLogs.EMAIL_EXISTS
        const { msg, Armsg, Frmsg } = formatErrString(
          resp.message,
          resp.messageFr as string,
          resp.messageAr as string,
          user.toObject()
        )
        userLogger.error(msg, { type: resp.type })
        return new ErrorResponseC(userLogs.USER_NOT_FOUND.type, HttpCodes.BadRequest.code, msg, {
          messageAr: Armsg,
          messageFr: Frmsg,
        })
      }
      const isPasswordMatch = await user.comparePasswords(password)
      if (isPasswordMatch) {
        const updatedUser = await UserModel.findByIdAndUpdate(id, { email: email }, { new: true })
        const resp: ICode<IUserLogs> = userLogs.USER_UPDATE_SUCCESS
        const msg = formatString(resp.message, updatedUser!.toObject())
        userLogger.info(msg, { type: resp.type })
        return new SuccessResponseC(
          resp.type,
          updatedUser!.Optimize(),
          msg,
          HttpCodes.Accepted.code
        )
      }
      const resp: ICode<IUserLogs> = userLogs.USER_UPDATE_ERROR_GENERIC
      userLogger.error('wrong password', { type: resp.type })
      return new ErrorResponseC(userLogs.USER_UPDATE_ERROR_GENERIC.type, 400, 'wrong password', {
        messageAr: 'كلمة المرور غير صحيحة',
        messageFr: 'mot de passe incorrect',
      })
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.USER_UPDATE_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async updateUserLang(id: ObjectId, lang: 'en' | 'fr' | 'ar') {
    try {
      const user = await UserModel.findById(id)
      if (!user) {
        const resp: ICode<IUserLogs> = userLogs.USER_NOT_FOUND
        return throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, userLogger)
      }
      const updatedUser = await UserModel.findByIdAndUpdate(id, { lang: lang }, { new: true })
      const resp: ICode<IUserLogs> = userLogs.USER_UPDATE_SUCCESS
      const msg = formatString(resp.message, updatedUser!.toObject())
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, updatedUser!.Optimize(), msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.USER_UPDATE_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }

  static async executeStoreUsersByIds(userIds: ObjectId[]) {
    try {
      const users = await UserModel.find({
        _id: { $in: userIds },
      })

      if (users.length < userIds.length) {
        const missingUserId = userIds.find(
          (id) => !users.some((user) => user._id.toString() === id.toString())
        )

        if (missingUserId) {
          const resp: ICode<IUserLogs> = userLogs.USER_NOT_FOUND
          return throwLocalizedErrorResponse(resp, HttpCodes.NotFound.code, userLogger)
        }
      }
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, users)
      userLogger.info(msg, { type: resp.type })
      const optimizedUsers = users.map((user) => user.Optimize())
      return new SuccessResponseC(resp.type, optimizedUsers, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
}

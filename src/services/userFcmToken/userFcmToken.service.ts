import { ObjectId } from 'mongoose'
import { HttpCodes } from '../../config/Errors'
import { UserModel } from '../../db/models/user/user.model'
import { formatString } from '../../utils/Strings'
import { ErrorResponseC, SuccessResponseC } from '../services.response'
import userFcmTokenLogs, { IUserFcmTokenLogs, userFcmTokenLogger } from './userFcmToken.logs'
import { formatErrString } from '../../utils/shared/FormatErrStrings'
export class UserFcmTokenServices {
  static async executeCreateFcmToken(userId: ObjectId, fcmToken: string) {
    try {
      const user = await UserModel.findById(userId)
      if (user) {
        const checkFcmTokens = user?.fcmTokens.find((token) => token === fcmToken)
        if (!checkFcmTokens) {
          user.fcmTokens = [...user.fcmTokens, fcmToken]
          await user.save()
        }

        console.log('user.fcmTokens ', user.fcmTokens)
        const resp: ICode<IUserFcmTokenLogs> = userFcmTokenLogs.CREATE_FCM_TOKEN_SUCCESS
        const msg = formatString(resp.message, user!)
        userFcmTokenLogger.info(msg, { type: resp.type })
        return new SuccessResponseC(resp.type, null, msg, HttpCodes.Accepted.code)
      }
    } catch (err) {
      const resp = userFcmTokenLogs.CREATE_FCM_TOKEN_ERROR_GENERIC
      const { msg, Armsg, Frmsg } = formatErrString(
        resp.message,
        resp.messageFr as string,
        resp.messageAr as string,
        {
          error: err,
        }
      )
      userFcmTokenLogger.error(msg)
      return new ErrorResponseC(resp.type, HttpCodes.InternalServerError.code, msg, {
        messageAr: Armsg,
        messageFr: Frmsg,
      })
    }
  }
  static async executeDeleteFcmToken(userId: ObjectId, fcmToken: string) {
    try {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        {
          $pull: {
            fcmTokens: { fcmToken },
          },
        },
        { new: true }
      )

      if (user) {
        const resp: ICode<IUserFcmTokenLogs> = userFcmTokenLogs.DELETE_FCM_TOKEN_SUCCESS
        const msg = formatString(resp.message, user!)
        userFcmTokenLogger.info(msg, { type: resp.type })
        const optimizedUser = user.Optimize()
        return new SuccessResponseC(resp.type, optimizedUser, msg, HttpCodes.Accepted.code)
      }
    } catch (err) {
      const resp = userFcmTokenLogs.DELETE_FCM_TOKEN_ERROR_GENERIC
      const { msg, Armsg, Frmsg } = formatErrString(
        resp.message,
        resp.messageFr as string,
        resp.messageAr as string,
        {
          error: err,
        }
      )
      userFcmTokenLogger.error(msg)
      return new ErrorResponseC(resp.type, HttpCodes.InternalServerError.code, msg, {
        messageAr: Armsg,
        messageFr: Frmsg,
      })
    }
  }
}

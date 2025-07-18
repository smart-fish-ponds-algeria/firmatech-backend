import { Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/Response'
import { ErrorResponseC, SuccessResponseC } from '../../services/services.response'
import { ObjectId } from 'mongoose'
import { MyRequest } from '../../types/Express'
import { UserD } from '../../db/models/user/user.model'
import { UserFcmTokenServices } from '../../services/userFcmToken/userFcmToken.service'

export class FcmTokenController {
  static async create(req: MyRequest<UserD>, res: Response) {
    const fcmToken = req.body.fcmToken

    console.log('fcmToken ', fcmToken)
    const userId = req.user!._id as unknown as ObjectId
    const result = await UserFcmTokenServices.executeCreateFcmToken(userId, fcmToken)

    if (result instanceof SuccessResponseC)
      return SuccessResponse(res, result.code, result.data, result.message, result.status)
    if (result instanceof ErrorResponseC)
      return ErrorResponse(
        res,
        result.code,
        result.message,
        result.error,
        undefined,
        result.translatedError
      )
  }

  static async delete(req: MyRequest<UserD>, res: Response) {
    const fcmToken = req.body.fcmToken
    const userId = req.user!._id as unknown as ObjectId
    const result = await UserFcmTokenServices.executeDeleteFcmToken(userId, fcmToken)

    if (result instanceof SuccessResponseC)
      return SuccessResponse(res, result.code, result.data, result.message, result.status)
    if (result instanceof ErrorResponseC)
      return ErrorResponse(
        res,
        result.code,
        result.message,
        result.error,
        undefined,
        result.translatedError
      )
  }
}

import { Response } from 'express'
import { UserD } from '../db/models/user/user.model'
import { catchErrorResponse, SuccessResponse } from '../utils/Response'
import { MyRequest } from '../types/Express'
import { UserServices } from '../services/user/user.service'
import { ObjectId } from 'mongoose'
import userLogs from '../services/user/user.logs'
import { handleResponseConversion } from '../utils/handleResponseConversion'

export const GetUser = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const id = req.params.id as unknown as ObjectId
    const result = await UserServices.findUser(id as unknown as ObjectId)
    handleResponseConversion(res, result)
  } catch (err: unknown) {
    const resp = userLogs.USER_UPDATE_ERROR_GENERIC
    catchErrorResponse(err, res, resp)
  }
}

export const DeleteUser = async (req: MyRequest<UserD>, res: Response) => {
  const id = req.params.id as unknown as ObjectId
  const result = await UserServices.executeDeleteUser(id)
  return handleResponseConversion(res, result)
}

export const UpdateUser = async (req: MyRequest<UserD>, res: Response) => {
  try {
    const { firstName, lastName, imgUrl } = req.body
    const userId = req.user!._id as unknown as ObjectId
    const result = await UserServices.updateUser({ id: userId, firstName, lastName, imgUrl })
    return SuccessResponse(res, result.code, result.data, result.message, result.status)
  } catch (error) {
    const resp = userLogs.USER_UPDATE_ERROR_GENERIC
    catchErrorResponse(error, res, resp)
  }
}

export const UpdateUserEmail = async (req: MyRequest<UserD>, res: Response) => {
  const { email, password } = req.body
  const userId = req.user!._id as unknown as ObjectId
  const result = await UserServices.updateUserEmail(userId, email, password)
  return handleResponseConversion(res, result)
}

export const UpdateUserPassword = async (req: MyRequest<UserD>, res: Response) => {
  const { newPassword, password } = req.body
  const userId = req.user!._id as unknown as ObjectId
  const result = await UserServices.updateUserPassword(userId, password, newPassword)
  return handleResponseConversion(res, result)
}

export const UpdateUserlang = async (req: MyRequest<UserD>, res: Response) => {
  const { lang } = req.body
  const userId = req.user!._id as unknown as ObjectId
  const result = await UserServices.updateUserLang(userId, lang as 'en' | 'fr' | 'ar')
  return handleResponseConversion(res, result)
}

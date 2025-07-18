import { Response, Request } from 'express'
import { ErrorResponse, SuccessResponse } from '../utils/Response'
import { ErrorResponseC, SuccessResponseC } from '../services/services.response'
import { MyAdminRequest} from '../types/Express'
import { AdminServices } from '../services/admin/Admin.service'
import { AdminD } from '../db/models/admin/admin.model'

export const AdminSignIn = async (req: Request, res: Response) => {
  const { email, password, stay = false } = req.body
  const result = await AdminServices.executeLogin(email, password, stay, res)
  if (result instanceof SuccessResponseC)
    return SuccessResponse(res, result.code, result.data, result.message, result.status)
  if (result instanceof ErrorResponseC)
    return ErrorResponse(res, result.code, result.message, result.error)
}

export const AdminSignUp = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, stay = true } = req.body
  const result = await AdminServices.executeRegister(
    email,
    password,
    firstName,
    lastName,
    stay,
    res
  )
  if (result instanceof ErrorResponseC)
    return ErrorResponse(res, result.code, result.message, result.error)
  if (result instanceof SuccessResponseC) {
    return SuccessResponse(res, result.code, 'email was sent', result.message, result.status)
  }
}
export const AdminForgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body
  const result = await AdminServices.executeforgetPassword(email)
  if (result instanceof SuccessResponseC)
    return SuccessResponse(res, result.code, result.data, result.message, result.status)
  if (result instanceof ErrorResponseC)
    return ErrorResponse(res, result.code, result.message, result.error)
}

export const AdminResetPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const { code } = req.params
  const result = await AdminServices.executeHandleResetPassword(email, password, +code)
  if (result instanceof SuccessResponseC)
    return SuccessResponse(res, result.code, result.data, result.message, result.status)
  if (result instanceof ErrorResponseC)
    return ErrorResponse(res, result.code, result.message, result.error)
}

export const AdminVerifyResetpassword = async (req: Request, res: Response) => {
  const { code } = req.params
  const email = req.body.email
  const result = await AdminServices.executeHandleVerifyResetPassword(+code, email)
  if (result instanceof SuccessResponseC)
    return SuccessResponse(res, result.code, result.data, result.message, result.status)
  if (result instanceof ErrorResponseC)
    return ErrorResponse(res, result.code, result.message, result.error)
}

export const isAdminLoggedInController = async (req: MyAdminRequest<AdminD>, res: Response) => {
  const admin = req.admin
  return SuccessResponse(res, 200, admin?.Optimize(), 'admin is logged in', '200')
}

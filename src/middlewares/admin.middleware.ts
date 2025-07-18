import { NextFunction, Response } from 'express'
import { MyAdminRequest } from '../types/Express'
import { ErrorResponse } from '../utils/Response'
import { HttpCodes } from '../config/Errors'
import { Verify } from '../utils/jwt'
import { authLogs } from '../services/auth/auth.logs'
import { isBefore } from 'date-fns'
import { AdminD, AdminModel } from '../db/models/admin/admin.model'
import { extractAuth } from './auth'
import { AuthAdminTokenPayload } from '../types/global'

export const checkAdminLogs = async (
  req: MyAdminRequest<null | AdminD>,
  res: Response,
  next: NextFunction
) => {
  const token = extractAuth(req)
  req.admin = null
  if (token) {
    try {
      const payload = Verify(token) as AuthAdminTokenPayload
      if (
        !payload ||
        !payload._id ||
        !payload.email ||
        !payload.role ||
        payload.role != 'superAdmin'
      )
        return ErrorResponse(
          res,
          HttpCodes.Unauthorized.code,
          authLogs.ERROR_WHILE_CHECKING_CREDENTIALS.message,
          authLogs.ERROR_WHILE_CHECKING_CREDENTIALS
        )
      if (isBefore(payload.expires, new Date())) {
        return ErrorResponse(
          res,
          HttpCodes.Unauthorized.code,
          authLogs.SESSION_EXPIRED.message,
          authLogs.SESSION_EXPIRED
        )
      }
      const { _id } = payload

      const user = await AdminModel.findOne({ _id })
      if (!user) {
        return ErrorResponse(
          res,
          HttpCodes.Unauthorized.code,
          authLogs.ERROR_WHILE_CHECKING_CREDENTIALS.message,
          authLogs.ERROR_WHILE_CHECKING_CREDENTIALS
        )
      }
      req.admin = user
    } catch (e) {
      return ErrorResponse(
        res,
        HttpCodes.InternalServerError.code,
        authLogs.ERROR_WHILE_CHECKING_CREDENTIALS.message,
        e
      )
    }
  }

  return next()
}

export const isAdminLoggedIn = (
  req: MyAdminRequest<null | AdminD>,
  res: Response,
  next: NextFunction
) => {
  if (req.admin) {
    return next()
  }
  return ErrorResponse(
    res,
    HttpCodes.Unauthorized.code,
    authLogs.USER_ISN_T_LOGGED.message,
    authLogs.USER_ISN_T_LOGGED
  )
}

import { NextFunction, Request, Response } from 'express'
import { MyRequest, UsersTypes } from '../types/Express'
import { ErrorResponse } from '../utils/Response'
import { HttpCodes } from '../config/Errors'
import { Verify } from '../utils/jwt'
import { authLogs } from '../services/auth/auth.logs'
import { UserModel } from '../db/models/user/user.model'
import { isBefore } from 'date-fns'
import { AuthTokenPayload } from '../types/global'

export function extractAuth(req: Request): string | null {
  const authHeader = req.headers.authorization || (req.headers.Authorization as string | undefined)
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  return null
}

export const verifyUserAuthMiddleware = async (
  req: MyRequest<null | UsersTypes>,
  res: Response,
  next: NextFunction
) => {
  const token = extractAuth(req)
  req.user = null

  if (token) {
    try {
      const payload = Verify(token) as AuthTokenPayload
      if (!payload || !payload._id || !payload.email)
        return ErrorResponse(
          res,
          HttpCodes.BadRequest.code,
          // authLogs.ERROR_WHILE_CHECKING_CREDENTIALS.message,
          `bad request, not enough info ${payload?.email} ${payload?._id}`,
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
      const { email } = payload

      const user = await UserModel.findOne({ email })
      if (!user) {
        return ErrorResponse(
          res,
          HttpCodes.NotFound.code,
          authLogs.ERROR_WHILE_CHECKING_CREDENTIALS.message,
          authLogs.ERROR_WHILE_CHECKING_CREDENTIALS
        )
      }

      req.user = user
      next()
    } catch (error) {
      return ErrorResponse(
        res,
        HttpCodes.InternalServerError.code,
        authLogs.ERROR_WHILE_CHECKING_CREDENTIALS.message,
        `server error: ${error}`
      )
    }
  } else {
    return ErrorResponse(
          res,
          HttpCodes.Unauthorized.code,
          authLogs.SESSION_EXPIRED.message,
          authLogs.SESSION_EXPIRED
        )
  }
}

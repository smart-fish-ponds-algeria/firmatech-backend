import { JWT_SECRET_KEY } from '../config/EnvProvider'
import jwt from 'jsonwebtoken'
import {
  AuthTokenPayload,
  InviteTokenPayload,
  PublicSaleConfigPayload,
  AuthAdminTokenPayload,
} from '../types/global'

export const Sign = (
  payload: AuthTokenPayload | InviteTokenPayload | PublicSaleConfigPayload | AuthAdminTokenPayload
) => {
  return jwt.sign(payload, JWT_SECRET_KEY)
}

export const Verify = (token: string) => {
  return jwt.verify(token, JWT_SECRET_KEY) as
    | AuthTokenPayload
    | InviteTokenPayload
    | PublicSaleConfigPayload
    | AuthAdminTokenPayload
}

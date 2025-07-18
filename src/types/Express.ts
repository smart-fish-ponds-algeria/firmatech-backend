import { NextFunction, Request, Response } from 'express'
import * as core from 'express-serve-static-core'
import { UserD } from '../db/models/user/user.model'
import { AdminD } from '../db/models/admin/admin.model'
export type UsersTypes = UserD
export interface MyRequest<
  Req extends UsersTypes | null,
  ReqBody = any,
  Params = core.ParamsDictionary,
  ResBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>,
> extends Request<Params, ResBody, ReqBody, ReqQuery, Locals> {
  user?: Req extends UsersTypes ? Req : Req | null
}

export interface MyAdminRequest<
  Req extends AdminD | null,
  ReqBody = any,
  Params = core.ParamsDictionary,
  ResBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>,
> extends Request<Params, ResBody, ReqBody, ReqQuery, Locals> {
  admin?: Req extends AdminD ? Req : Req | null
}

export interface UserRouter<T extends UsersTypes | null> {
  controller: (req: MyRequest<T>, res: Response, next: NextFunction) => any
}
export type permissionTypeI = 'assignment' | 'global'

// export interface MyAdminStoreRequest<
//   Req extends StoresAdminTypes | null,
//   ReqBody = any,
//   Params = core.ParamsDictionary,
//   ResBody = any,
//   ReqQuery = core.Query,
//   Locals extends Record<string, any> = Record<string, any>,
// > extends Request<Params, ResBody, ReqBody, ReqQuery, Locals> {
//   admin?: Req extends AdminD ? Req : Req | null

//   store?: Req extends StoreD ? Req : null
// }

export type TypedRequestBody<T> = Request<
  any, // params
  any, // response body
  T, // request body
  any // query
>

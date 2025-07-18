import { Application } from 'express'
import indexRouter from './index.router'
import authRouter from './auth/auth.router'
import userRouter from './user.router'
import fcmTokenRouter from './fcmtoken.router'
import testRouter from './test.router'
import adminRouter from './admin/admin.router'


export default function SetRouters(app: Application) {
  app.use('/', indexRouter)
  app.use('/auth', authRouter)
  app.use('/users', userRouter)
  app.use('/fcmTokens', fcmTokenRouter)
  app.use('/test', testRouter)
  app.use('/admin', adminRouter)
}

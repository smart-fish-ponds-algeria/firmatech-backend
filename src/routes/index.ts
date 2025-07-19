import { Application, Request } from 'express'
import indexRouter from './index.router'
import authRouter from './auth/auth.router'
import userRouter from './user.router'
import fcmTokenRouter from './fcmtoken.router'
import adminRouter from './admin/admin.router'
import measurementsRouter from './measurement.router'
import waterTanksRouter from './waterTank.router'
import feedRouter from './feed.router'

export default function SetRouters(app: Application) {
  app.use('/', indexRouter)
  app.use('/auth', authRouter)
  app.use('/users', userRouter)
  app.use('/waterTanks', waterTanksRouter)
  app.use('/measurements', measurementsRouter)
  app.use('/fcmTokens', fcmTokenRouter)
  app.use('/admin', adminRouter)
  app.use('/feed', feedRouter)
}

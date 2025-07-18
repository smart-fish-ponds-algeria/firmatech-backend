import { Router } from 'express'
import { validator } from '../middlewares/validator/validator'
import { verifyUserAuthMiddleware } from '../middlewares/auth'
import { FcmTokenController } from '../controllers/fcmToken/fcmToken.controller'
import { createUserFcmToken } from '../services/userFcmToken/userFcmToken.validator'

const fcmTokenRouter = Router()
fcmTokenRouter
  .route('/')
  .post(verifyUserAuthMiddleware, createUserFcmToken, validator, FcmTokenController.create)
fcmTokenRouter
  .route('/')
  .delete(verifyUserAuthMiddleware, createUserFcmToken, validator, FcmTokenController.delete)

export default fcmTokenRouter

import {
  loginValidators,
  registerValidators,
  forgetPasswordValidators,
  resetPasswordValidators,
  verifyResetPasswordValidators,
  skipTokenValidators,
} from '../../services/auth/auth.validator'
import {
  SignIn,
  SignUp,
  AuthBack,
  AuthLogout,
  ForgetPassword,
  ResetPassword,
  isUserLoggedIn,
  VerifyResetpassword,
  Skip,
} from '../../controllers/auth.controller'
import { Router } from 'express'
import { validator } from '../../middlewares/validator/validator'
import { verifyUserAuthMiddleware } from '../../middlewares/auth'
import { uploadFile } from '../../middlewares/imgUpload'
import emailVerificationRouter from './verificationEmail.router'

const authRouter = Router()

authRouter.route('/login').post(loginValidators, validator, SignIn)
authRouter.use('/email', emailVerificationRouter)

authRouter.route('/isLoggedIn').get(verifyUserAuthMiddleware, isUserLoggedIn)
authRouter.route('/register').post(registerValidators, validator, SignUp)
authRouter.route('/forgetPassword').post(forgetPasswordValidators, validator, ForgetPassword)

authRouter.route('/resetPassword/:code').post(resetPasswordValidators, validator, ResetPassword)
authRouter.route('/').get(verifyUserAuthMiddleware, AuthBack)
authRouter.route('/logout').get(verifyUserAuthMiddleware, AuthLogout)
authRouter
  .route('/verifiyCode/:code')
  .post(verifyResetPasswordValidators, validator, VerifyResetpassword)
authRouter.route('/skipLogin/:skipToken').post(skipTokenValidators, validator, Skip)
export default authRouter

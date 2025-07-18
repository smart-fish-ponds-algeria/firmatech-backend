import {
  resendEmailVerificationValidators,
  verifyEmailVerificationValidators,
} from '../../services/auth/auth.validator'
import { VerifyEmail, resendVerificationEmail } from '../../controllers/auth.controller'
import { Router } from 'express'
import { validator } from '../../middlewares/validator/validator'

const emailVerificationRouter = Router()

emailVerificationRouter
  .route('/verify/:verificationCode')
  .post(verifyEmailVerificationValidators, validator, VerifyEmail)
emailVerificationRouter
  .route('/resend-verification/:email')
  .get(resendEmailVerificationValidators, validator, resendVerificationEmail)
export default emailVerificationRouter

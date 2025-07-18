import {
  loginValidators,
  forgetPasswordValidators
} from '../../services/auth/auth.validator'
import { Router } from 'express'
import { validator } from '../../middlewares/validator/validator'
import { checkAdminLogs, isAdminLoggedIn } from '../../middlewares/admin.middleware'
import {
  AdminForgetPassword,
  AdminSignIn,
  AdminSignUp,
  isAdminLoggedInController,
} from '../../controllers/adminAuth.controller'

const adminRouter = Router()
adminRouter.route('/login').post(loginValidators, validator, AdminSignIn)
adminRouter.route('/isLoggedIn').get(checkAdminLogs, isAdminLoggedIn, isAdminLoggedInController)
adminRouter.route('/register').post(AdminSignUp)
adminRouter.route('/forgetPassword').post(forgetPasswordValidators, validator, AdminForgetPassword)

export default adminRouter

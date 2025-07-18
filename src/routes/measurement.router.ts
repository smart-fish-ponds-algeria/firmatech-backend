import { Router } from 'express'
import { validator } from '../middlewares/validator/validator'
import {
  DeleteUser,
  GetUser,
  UpdateUser,
  UpdateUserlang,
  UpdateUserEmail,
  UpdateUserPassword,
  GetAllUsers,
} from '../controllers/user.controller'
import {
  getUserValidators,
  updateUserValidators,
  updateUserPasswordValidators,
  updateUserLangValidators,
  updateUserEmailValidators,
} from '../services/user/user.validators'
import { uploadFile } from '../middlewares/imgUpload'
import { verifyUserAuthMiddleware } from '../middlewares/auth'
import { TankMeasurementController } from '../controllers/TankMeasurement.controller'

const measurementsRouter = Router()

measurementsRouter.route('/').post(TankMeasurementController.createMeasurement)

export default measurementsRouter

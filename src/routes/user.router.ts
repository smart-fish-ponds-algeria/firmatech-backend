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

const userRouter = Router()

userRouter.route('/').get(GetAllUsers)
userRouter.route('/:id').get(getUserValidators, validator, GetUser)
userRouter
  .route('/updatePassword')
  .put(verifyUserAuthMiddleware, updateUserPasswordValidators, validator, UpdateUserPassword)
userRouter
  .route('/updateEmail')
  .put(verifyUserAuthMiddleware, updateUserEmailValidators, validator, UpdateUserEmail)
userRouter
  .route('/updateLang')
  .put(verifyUserAuthMiddleware, updateUserLangValidators, validator, UpdateUserlang)
userRouter.route('/:id').put(
  verifyUserAuthMiddleware,
  uploadFile.single('logo'),

  updateUserValidators,
  validator,
  UpdateUser
)
userRouter.route('/:id').delete(verifyUserAuthMiddleware, getUserValidators, validator, DeleteUser)
export default userRouter

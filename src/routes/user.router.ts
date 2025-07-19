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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */

userRouter.route('/').get(GetAllUsers)
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: mongo-id
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: User not found
 */

userRouter.route('/:id').get(getUserValidators, validator, GetUser)
/**
 * @swagger
 * /users/updatePassword:
 *   put:
 *     summary: Update user password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - newPassword
 *             properties:
 *               password:
 *                 type: string
 *                 example: oldPassword123
 *               newPassword:
 *                 type: string
 *                 example: newSecurePass456
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

userRouter
  .route('/updatePassword')
  .put(verifyUserAuthMiddleware, updateUserPasswordValidators, validator, UpdateUserPassword)
/**
 * @swagger
 * /users/updateEmail:
 *   put:
 *     summary: Update user email
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: newemail@example.com
 *     responses:
 *       200:
 *         description: Email updated successfully
 *       400:
 *         description: Invalid email format
 *       401:
 *         description: Unauthorized
 */

userRouter
  .route('/updateEmail')
  .put(verifyUserAuthMiddleware, updateUserEmailValidators, validator, UpdateUserEmail)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user profile by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: mongo-id
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

userRouter.route('/:id').put(
  verifyUserAuthMiddleware,
  uploadFile.single('logo'),

  updateUserValidators,
  validator,
  UpdateUser
)
userRouter.route('/:id').delete(verifyUserAuthMiddleware, getUserValidators, validator, DeleteUser)
export default userRouter

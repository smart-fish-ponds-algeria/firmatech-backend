import { loginValidators, forgetPasswordValidators } from '../../services/auth/auth.validator'
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
/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass123!
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or missing password
 *       401:
 *         description: Unauthorized
 */

adminRouter.route('/login').post(loginValidators, validator, AdminSignIn)
/**
 * @swagger
 * /admin/isLoggedIn:
 *   get:
 *     summary: Check if admin is logged in
 *     responses:
 *       200:
 *         description: Admin is logged in
 *       401:
 *         description: Not authenticated
 */

adminRouter.route('/isLoggedIn').get(checkAdminLogs, isAdminLoggedIn, isAdminLoggedInController)
/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: AdminPass1!
 *               firstName:
 *                 type: string
 *                 minLength: 2
 *                 example: John
 *               lastName:
 *                 type: string
 *                 minLength: 2
 *                 example: Doe
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Validation error
 */

adminRouter.route('/register').post(AdminSignUp)
/**
 * @swagger
 * /admin/forgetPassword:
 *   post:
 *     summary: Request password reset for admin
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
 *                 example: admin@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Invalid email
 */

adminRouter.route('/forgetPassword').post(forgetPasswordValidators, validator, AdminForgetPassword)

export default adminRouter

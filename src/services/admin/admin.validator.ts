import { body, param } from 'express-validator'

export const loginValidators = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
]

export const skipTokenValidators = [
  body('email').isEmail().withMessage('Invalid email'),
  param('skipToken').isString().withMessage('Please enter a valid token'),
]
export const registerValidators = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('firstName')
    .isLength({ min: 3 })
    .withMessage('firstName must be at least 3 characters long'),
  body('lastName').isLength({ min: 3 }).withMessage('lastName must be at least 3 characters long'),
]

export const resetPasswordValidators = [
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  param('code').isString().withMessage('Invalid code'),
  body('email').isEmail().withMessage('Invalid email'),
]

export const verifyResetPasswordValidators = [
  param('code').isNumeric().withMessage('Invalid code'),
  body('email').isEmail().withMessage('Invalid email'),
]
export const forgetPasswordValidators = [body('email').isEmail().withMessage('Invalid email')]

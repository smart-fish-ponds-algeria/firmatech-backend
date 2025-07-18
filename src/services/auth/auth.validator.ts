import { body, param, ValidationChain } from 'express-validator'

const NO_SPECIAL_CHARS = /^[A-Za-z0-9 _]*$/
export const validateEmail = (
  field: string = 'email',
  options: { maxLength?: number; message?: string } = {}
): ValidationChain => {
  const { maxLength, message = 'Invalid email' } = options
  let chain = body(field).isEmail().withMessage(message)
  if (maxLength) {
    chain = chain.isLength({ max: maxLength }).withMessage('auth.signup.max255')
  }
  return chain
}
export const validatePassword = (field: string = 'password'): ValidationChain => {
  return body(field)
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
}
export const loginValidators = [
  validateEmail(),
  body('password').notEmpty().withMessage('Password is required'),
]

export const resendEmailVerificationValidators = [validateEmail()]
export const verifyEmailVerificationValidators = [
  param('email').isEmail().withMessage('invalid email'),
  param('verificationCode').isString().withMessage('Invalid :verificationCode'),
]
export const skipTokenValidators = [
  validateEmail(),
  param('skipToken').isString().withMessage('Please enter a valid token'),
]
export const registerValidators = [
  validateEmail(),
  validatePassword(),
  // NOTE: confirm password validation just in case  its needed
  // body('confirmPassword')
  //   .isLength({ min: 8 })
  //   .withMessage('auth.signup.errors.confirm-password-min')
  //   .custom((value, { req }) => {
  //     if (value !== req.body.password) {
  //       throw new Error('auth.signup.errors.passwords-mismatch')
  //     }
  //     return true
  //   }),
  body('firstName')
    .isLength({ min: 2 })
    .withMessage('auth.signup.errors.first-name-min')
    .matches(NO_SPECIAL_CHARS)
    .withMessage('auth.signup.specialChar'),
  body('lastName')
    .isLength({ min: 2 })
    .withMessage('auth.signup.errors.last-name-min')
    .matches(NO_SPECIAL_CHARS)
    .withMessage('auth.signup.specialChar'),
]

export const resetPasswordValidators = [
  validatePassword(),
  param('code').isString().withMessage('Invalid code'),
  validateEmail(),
]

export const verifyResetPasswordValidators = [
  param('code').isNumeric().withMessage('Invalid code'),
  validateEmail(),
]

export const forgetPasswordValidators = [body('email').isEmail().withMessage('Invalid email')]

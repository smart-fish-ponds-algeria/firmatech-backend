import { body, param } from 'express-validator'

export const updateUserValidators = [
  body('firstName').optional().notEmpty().withMessage('firstName is required ans must be string'),
  body('lastName').optional().notEmpty().withMessage('firstName is required ans must be string'),
  body('imgUrl').optional().isString().withMessage('img url is string'),
]

export const updateUserEmailValidators = [
  body('email').exists().withMessage('email is required').isEmail().withMessage('Invalid email'),
]

export const updateUserLangValidators = [
  body('lang')
    .exists()
    .withMessage('lang is required')
    .isString()
    .withMessage('lang must be en | fr | ar'),
]

export const updateUserPasswordValidators = [
  body('password').notEmpty().withMessage('Password is required'),
  body('newPassword').notEmpty().withMessage('newPassword is required '),
]

export const getUserValidators = [param('id').isMongoId().withMessage('Invalid mongo id')]

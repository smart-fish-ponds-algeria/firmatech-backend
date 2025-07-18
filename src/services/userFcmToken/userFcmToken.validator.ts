import { body } from 'express-validator'

export const createUserFcmToken = [
  body('fcmToken').optional().notEmpty().withMessage('firstName is required ans must be string'),
]

export const deleteUserFcmToken = [
  body('fcmToken').optional().notEmpty().withMessage('firstName is required ans must be string'),
]

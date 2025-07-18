import { body } from 'express-validator'

export const sendEmailValidator = [
  body('email').exists().withMessage('email is required').isEmail().withMessage('Invalid email'),
  body('lang')
    .exists()
    .withMessage('lang is required')
    .isString()
    .withMessage('lang must be string'),
]

export const sendContactValidator = [
  body('email').exists().withMessage('email is required').isEmail().withMessage('Invalid email'),
  body('firstName')
    .exists()
    .withMessage('firstName is required')
    .isString()
    .withMessage('firstName must be string'),
  body('lastName')
    .exists()
    .withMessage('lastName is required')
    .isString()
    .withMessage('lastName must be string'),
  body('lang')
    .exists()
    .withMessage('lang is required')
    .isString()
    .withMessage('lang must be string'),
  body('description')
    .exists()
    .withMessage('description is required')
    .isString()
    .withMessage('description must be string'),
  body('subject')
    .exists()
    .withMessage('subject is required')
    .isString()
    .withMessage('subject must be string'),
]

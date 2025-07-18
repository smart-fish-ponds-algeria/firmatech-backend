import { Request, Response } from 'express'
import { ExitCodes, HttpCodes } from '../config/Errors'
import { ErrorResponseC } from '../services/services.response'
import axios, { AxiosError } from 'axios'
import { IN_DEVELOPMENT } from '../config/EnvProvider'

export function getErrorMessageByCode(code: number): string | undefined {
  for (const key in ExitCodes) {
    if (
      Object.prototype.hasOwnProperty.call(ExitCodes, key) &&
      ExitCodes[key as IExitCodes].code === code
    ) {
      return ExitCodes[key as IExitCodes].message
    }
  }
  return undefined
}

/**
 * @description  this class is used to handle errors
 * @params {string} message - The message of the error
 * @params {number} statusCode - The status code of the error
 * @returns {AppError} - The error object
 *
 * ```ts
 * throw new AppError("Error message", 500);
 * ```
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number
  ) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * @description  this class is used to handle http errors
 * @params   {ICode} httpError - The http error object
 * @params   {string} cause - The cause of the error
 * @returns - {AppHttpError} - The error object
 *
 * ```ts
 * throw new AppHttpError(HttpCodes.BadRequest, "Error message");
 * ```
 *
 */
export class AppHttpError extends AppError {
  cause: string
  constructor(
    public httpError: ICode,
    cause: string
  ) {
    super(httpError.message, httpError.code)
    this.cause = cause
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * @description this middleware function is used to handle errors
 * @param error {AppError} - The error object
 * @param req  {Request} - express request object
 * @param res  {Response} - express response object
 * @param next  {NextFunction} - express next function
 * @returns
 *  - {Response} - express response object
 *
 *
 *
 *
 */

export function errorMiddleware(error: AppError, req: Request, res: Response) {
  const status = error.statusCode || HttpCodes.InternalServerError.code
  const message = error.message || HttpCodes.InternalServerError.message
  const errorDetails = IN_DEVELOPMENT ? error : undefined

  res.status(status).json({
    status,
    message,
    error: errorDetails,
  })
}

export function handleAxiosError(error: unknown): ErrorResponseC {
  console.log('error ', error)
  if (axios.isAxiosError(error) || error instanceof AxiosError) {
    if (error.response) {
      // console.error(`error.response ${JSON.stringify(error.response)}`)
      const errorMessage =
        error.response.data?.message || error.response.data?.detail || error.response.data?.error
      console.error(`Error response status: ${error.response.status}`)
      console.error(`Error response data: ${errorMessage}`)
      return new ErrorResponseC(errorMessage, error.response.status, error.message)
    } else {
      console.error(`Error message: ${error.message}`)
      return new ErrorResponseC(error.message, HttpCodes.InternalServerError.code, error.message)
    }
  } else {
    if (error instanceof Error) {
      console.error(`Error message: ${error.message}`)
      return new ErrorResponseC(
        'Internal Server Error',
        HttpCodes.InternalServerError.code,
        error.message
      )
    }
    return new ErrorResponseC('Internal Server Error', HttpCodes.InternalServerError.code, error)
  }
}

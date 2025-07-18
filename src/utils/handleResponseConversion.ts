import { Response } from 'express'
import { ErrorResponseC, SuccessResponseC } from '../services/services.response'
import { ErrorResponse, SuccessResponse } from './Response'

/**
 * Handles the conversion of a service result into an HTTP response.
 *
 * @param {Response} res - The Express response object.
 * @param {SuccessResponseC | ErrorResponseC} serviceResult - The result from the service, either a success or an error response.
 * @returns {void} - Sends the appropriate HTTP response based on the service result.
 */
export function handleResponseConversion(
  res: Response,
  serviceResult: SuccessResponseC | ErrorResponseC
): void {
  if (serviceResult instanceof ErrorResponseC) {
    console.log('serviceResult : ', serviceResult)

    return ErrorResponse(
      res,
      serviceResult.code,
      serviceResult.message,
      serviceResult.error,
      undefined,
      serviceResult.translatedError
    )
  }
  return SuccessResponse(res, serviceResult.code, serviceResult.data, serviceResult.message)
}

import { Error } from 'mongoose'
import { HttpCodes } from '../config/Errors'
import { Response as ExpressResponse } from 'express'
import { MongoError } from 'mongodb'
import { assert } from 'console'
import { ISseLogs, sseLogger, sseLogs } from '../services/sse/sse.logs'
import { formatErrString } from './shared/FormatErrStrings'
import { ErrorResponseC } from '../services/services.response'
import { handleResponseConversion } from './handleResponseConversion'
function extractDuplicateKey(errorMessage: string): string | null {
  const match = errorMessage.match(/index:\s+([^\s]+)/)
  return match ? match[1] : 'unknown'
}
export function ErrorResponse(
  res: ExpressResponse,
  code: number,
  errorMessage: string,
  error?: unknown,
  resType: 'stream' | 'send' = 'send',
  translatedError?: {
    messageFr: string | undefined
    messageAr: string | undefined
  }
) {
  assert(code >= 300, 'Error code must be greater than 300')
  console.log('🔥🔥🔥🔥🔥')
  console.log('ERROR: ⬇️⬇️⬇️⬇️⬇️⬇️')
  console.log(error)
  console.log('🔥🔥🔥🔥🔥')

  let response: ErrorResponseI =
    error && error instanceof Error.ValidationError && error.errors
      ? {
          status: 'error',
          message: Object.values(error.errors)
            .map((err) => err.message)
            .join(','),
          code: HttpCodes.BadRequest.code,
          error,
          translatedError: translatedError,
        }
      : error && error instanceof MongoError && error.code === 11000
        ? {
            status: 'error',
            message: `These keys already exist [${extractDuplicateKey(error.message)}], it's not allowed to use duplicate keys`,
            code: HttpCodes.BadRequest.code,
            error,
            translatedError: translatedError,
          }
        : {
            status: 'error',
            message: errorMessage,
            code: code,
            error,
            translatedError: translatedError,
          }

  if (code === HttpCodes.NotFound.code) {
    response = {
      status: 'error',
      message: `${errorMessage}`,
      code: HttpCodes.NotFound.code,
      error,
      translatedError: translatedError,
    }
  }
  if (resType === 'stream') {
    const jsonString = JSON.stringify(response)
    const resp: ICode<ISseLogs> = sseLogs.SSE_STREAM_SUCCESS
    sseLogger.info(resp.message, { type: resp.type })
    res.status(code).write(`data: ${jsonString}\n\n`)
  } else {
    res.status(response.code).send(response)
  }
}
export function SuccessResponse(
  res: ExpressResponse,
  code: number,
  data: unknown,
  message = 'Successful',
  status = 'success',
  resType: 'stream' | 'send' = 'send'
) {
  assert(code < 300, 'Success code must be less than 300')
  const response: SuccessResponseI = {
    status,
    data,
    message,
  }
  if (resType === 'stream') {
    const jsonString = JSON.stringify(response)
    const resp: ICode<ISseLogs> = sseLogs.SSE_STREAM_SUCCESS
    sseLogger.info(resp.message, { type: resp.type })
    res.write(`data: ${jsonString}\n\n`)
  } else {
    res.status(code).send(response)
  }
}

function InternalErrorResponse(
  res: ExpressResponse,
  resp: ICode<any>,
  err: unknown,
  resType: 'stream' | 'send' = 'send'
) {
  let msg = 'Error'
  let Armsg = 'خطأ'
  let Frmsg = 'Erreur'
  if (err instanceof Error) {
    const formattedError = formatErrString(
      resp.message,
      resp.messageFr as string,
      resp.messageAr as string,
      {
        error: err.message || '',
      }
    )
    msg = formattedError.msg
    Armsg = formattedError.Armsg
    Frmsg = formattedError.Frmsg
  }
  return ErrorResponse(res, HttpCodes.InternalServerError.code, msg, msg, resType, {
    messageAr: Armsg,
    messageFr: Frmsg,
  })
}

export function catchErrorResponse(err: unknown, res: ExpressResponse, resp?: ICode<any>) {
  console.log('🔥🔥🔥🔥🔥')
  console.log('ERROR: ⬇️⬇️⬇️⬇️⬇️⬇️')
  console.log(err)
  console.log('🔥🔥🔥🔥🔥')

  if (err instanceof ErrorResponseC) {
    return handleResponseConversion(res, err)
  } else {
    if (!resp) resp = HttpCodes.InternalServerError
    return InternalErrorResponse(res, resp, err)
  }
}

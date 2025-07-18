import assert from 'assert'
import { formatString } from '../utils/Strings'
import Logger from '../utils/Logger'

// TODO: WE SHOULD DO <T>
export class SuccessResponseC implements SuccessResponseI {
  status: string
  data: unknown
  message: string
  code: number
  constructor(status: string, data: unknown, message: string, code: number) {
    this.status = status
    this.data = data
    this.message = message
    this.code = code
    assert(this.code < 300, 'Success code must be less than 300')
  }
}

export class ErrorResponseC extends Error implements ErrorResponseI {
  status: string
  code: number
  message: string
  error: unknown
  translatedError?: {
    messageAr: string | undefined
    messageFr: string | undefined
  }
  isOperational: boolean

  constructor(
    message: string,
    code: number,
    error: unknown,
    translatedError?: {
      messageAr: string | undefined
      messageFr: string | undefined
    }
  ) {
    super(message)

    assert(code >= 300, 'Error code must be greater than 300')

    this.name = new.target.name
    this.code = code
    this.status = code.toString().startsWith('4') ? 'fail' : 'error'
    this.message = message
    this.error = error
    this.translatedError = translatedError
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export function throwLocalizedErrorResponse(
  resp: ICode,
  httpCode: number,
  logger: Logger,
  formattedParams: { [key: string]: string | number } = {},
  error?: unknown
) {
  const messages = {
    en: formatString(resp.message, formattedParams),
    fr: formatString(resp.messageFr ?? '', formattedParams),
    ar: formatString(resp.messageAr ?? '', formattedParams),
  }

  logger.error(messages.en)

  console.log('🔥🔥🔥🔥🔥')
  console.log('ERROR: ⬇️⬇️⬇️⬇️⬇️')
  console.log(error)
  console.log('🔥🔥🔥🔥🔥')
  return new ErrorResponseC(resp.type, httpCode, messages.en, {
    messageFr: messages.fr,
    messageAr: messages.ar,
  })
}

import { EnvEmitter } from '../utils/Events'
import { exitProcess } from '../utils/Process'
import { log } from '../utils/Function'
import { ExitCodes } from './Errors'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

export function CheckRequiredEnv(Env_Field: string, exitCode: ICode) {
  if (!process.env[Env_Field]) {
    log(`🔴 Failed on loading env field => '${Env_Field}'`)
    exitProcess(exitCode, { field: Env_Field })
  }
  log(`🟢 Checking env field => '${Env_Field}' : ${process.env[Env_Field]}`)
  return process.env[Env_Field]?.trimEnd() as string
}

function CheckOptionalEnv(envField: string, replacedBy: string = 'undefined'): string {
  const value = process.env[envField]
  if (value) {
    log(`🟢 Checking env field => '${envField}' : ${process.env[envField]}`)
    return value
  }
  log(`🟡 Checking env field => '${envField}' : 'undefined' Replaced by => ${replacedBy}`)
  return replacedBy?.trimEnd()
}
// ...existing code...
export const NODE_ENV = CheckRequiredEnv('NODE_ENV', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
export const MONGODB_URI = CheckRequiredEnv('MONGO_DB_URI', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
export const JWT_SECRET = CheckRequiredEnv('JWT_SECRET', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
export const MONGODB_NAME = CheckRequiredEnv('MONGODB_NAME', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
export const EMAIL_USER = CheckRequiredEnv('EMAIL_USER', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
export const EMAIL_SECRET = CheckRequiredEnv('EMAIL_SECRET', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
export const Cloudinary_Name = CheckRequiredEnv(
  'Cloudinary_Name',
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
)
export const Cloud_api_key = CheckRequiredEnv(
  'Cloud_api_key',
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
)
export const Cloud_api_secret = CheckRequiredEnv(
  'Cloud_api_secret',
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
)
export const BACK_URL_PROD = CheckRequiredEnv('BACK_URL', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
export const BACKEND_URL_DEV = CheckRequiredEnv(
  'BACKEND_URL_DEV',
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
)
export const SESSION_SECRET = CheckRequiredEnv(
  'SESSION_SECRET',
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
)
export const FIREBASE_EMAIL = CheckRequiredEnv(
  'FIREBASE_EMAIL',
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
)
export const FIREBASE_PRIVATEKEY = CheckRequiredEnv(
  'FIREBASE_PRIVATEKEY',
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
)
export const FIREBASE_PROJECT_ID = CheckRequiredEnv(
  'FIREBASE_PROJECT_ID',
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
)
export const FRONT_URL_PROD = CheckRequiredEnv('FRONT_URL', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
export const FRONT_URL_DEV = CheckRequiredEnv(
  'FRONT_URL_DEV',
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
)
export const FRONT_URL = NODE_ENV === 'production' ? FRONT_URL_PROD : FRONT_URL_DEV
export const BACK_URL = NODE_ENV === 'production' ? BACK_URL_PROD : BACKEND_URL_DEV

export const BACK_PORT = CheckRequiredEnv('BACK_PORT', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
// export const SMS_USER = CheckRequiredEnv('SMS_USER', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
// export const SMS_PASSWORD = CheckRequiredEnv('SMS_PASSWORD', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
export const JWT_SECRET_KEY = CheckRequiredEnv(
  'JWT_SECRET_KEY',
  ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD
)

export const PROJECT_ID = CheckRequiredEnv('PROJECT_ID', ExitCodes.ENV_ERROR_COULDNT_FIND_FIELD)
/**
 * @description The current working directory of the project.
 */
export const CWD = (() => {
  log(`🔵 The project started from ${process.cwd()}`)
  return process.cwd()
})()

/**
 * @description Flag indicating if the application is in development mode.
 * @default true
 */
export const InDev = CheckOptionalEnv('IN_PROD', 'false') === 'false'
export const IN_PROD = CheckOptionalEnv('IN_PROD', 'false') === 'true'
export const IN_DEVELOPMENT = CheckOptionalEnv('NODE_ENV', 'development') === 'development'
export const IN_PRODUCTION = CheckOptionalEnv('NODE_ENV', 'production') === 'production'
/**
 * @description The default port number if the 'BACK_PORT' environment variable is not set.
 * @default "8080"
 */
export const PORT = CheckOptionalEnv('BACK_PORT', '8080')

/**
 * @description The developer's email address.
 * @default "rayanalllali@gmail.com"
 */
export const DEV_Email = CheckOptionalEnv('DEV_Email', 'rayanalllali@gmail.com')

/**
 * @description The root directory where log files are stored.
 * @default value path.join(CWD, "logs")
 */
export const LogsRoot = CheckOptionalEnv('LogsRoot', path.join(CWD, 'logs'))

export const InTest = NODE_ENV === 'test'
log('--------------------------------------------------------\n')
EnvEmitter.emit('loaded')

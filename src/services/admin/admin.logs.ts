import Logger from '../../utils/Logger'
export type IAuthLogs =
  | 'LOGIN_SUCCESS'
  | 'MOBILE_LOGIN_SUCCESS'
  | 'LOGIN_ERROR_GENERIC'
  | 'LOGIN_ERROR_INVALID_INPUT'
  | 'LOGIN_ERROR_EMAIL_NOT_FOUND'
  | 'LOGIN_ERROR_INCORRECT_PASSWORD_FOUND'
  | 'LOGIN_ERROR_DISABLED_ACCOUNT'
  | 'USER_ISN_T_LOGGED'
  | 'ERROR_SESSION_CREDENTIALS'
  | 'ERROR_WHILE_CHECKING_CREDENTIALS'
  | 'GENERIC_CREDENTIALS_ERROR'
  | 'AUTH_BACK'
  | 'USER_NOT_FOUND'
  | 'LOGOUT_SUCCESS'
  | 'USER_IS_LOGGED'
  | 'RESET_SUCCESS'
  | 'RESET_PASSWORD_SENT_SUCCESS'
  | 'RESET_PASSWORD_TOKEN_EXPIRED_ERROR'
  | 'RESET_PASSWORD_SUCCESS'
  | 'RESET_ERROR_GENERIC'
  | 'REGISTER_SUCCESS'
  | 'AUTH_ERROR_GENERIC'
  | 'REGISTER_ERROR_GENERIC'
  | 'REGISTER_ERROR_INVALID_INPUT'
  | 'REGISTER_ERROR_EMAIL_EXIST'
  | 'REGISTER_ERROR_PHONE_EXIST'
  | 'REGISTER_ERROR_PASSWORD'
  | 'AUTH_LOGOUT'
  | 'RESET_TOKEN_NOTFOUND_ERROR'
  | 'SESSION_EXPIRED'
  | 'CHECK_RESET_PASSWORD_SUCCESS'
  | 'ADMIN_VIEW_STORE_ERROR'
  | 'ADMIN_VIEW_STORE_SUCCESS'
  | 'CHANGE_STORE_LIMIT_ERROR'
  | 'CHANGE_STORE_LIMIT_SUCCESS'
  | 'EXCEEDS_SELECTED_STORE_LIMIT_ERROR'

let i = 0
export const authLogs: IErrors<IAuthLogs> = {
  EXCEEDS_SELECTED_STORE_LIMIT_ERROR: {
    code: i++,
    message: 'User already owns more stores than the selected store limit',
    messageFr: 'L’utilisateur possède déjà plus de magasins que la limite sélectionnée',
    messageAr: 'يمتلك المستخدم بالفعل متاجر أكثر من الحد المسموح به المختار',
    type: 'EXCEEDS_SELECTED_STORE_LIMIT_ERROR',
  },
  CHANGE_STORE_LIMIT_SUCCESS: {
    code: i++,
    message: 'user store-limit was updated.',
    type: 'CHANGE_STORE_LIMIT_SUCCESS',
  },
  CHANGE_STORE_LIMIT_ERROR: {
    code: i++,
    message: 'Error occurred while updating user store_limit: {error}',
    type: 'CHANGE_STORE_LIMIT_ERROR',
  },
  LOGIN_SUCCESS: {
    code: i++,
    message: 'User "{email} : {fullName}" has logged in successfully.',
    type: 'LOGIN_SUCCESS',
  },
  MOBILE_LOGIN_SUCCESS: {
    code: i++,
    message: 'User "{email} : {fullName}" has logged in successfully from mobile.',
    type: 'MOBILE_LOGIN_SUCCESS',
  },
  LOGIN_ERROR_GENERIC: {
    code: i++,
    message: "Error occurred while login in user '{email}': {error}",
    type: 'LOGIN_ERROR_GENERIC',
  },
  LOGIN_ERROR_INVALID_INPUT: {
    code: i++,
    message: 'Invalid input for Log in : {input}',
    type: 'LOGIN_ERROR_INVALID_INPUT',
  },
  LOGIN_ERROR_EMAIL_NOT_FOUND: {
    code: i++,
    message: "Failed to login email doesn't exist {email}.",
    type: 'LOGIN_ERROR_EMAIL_NOT_FOUND',
  },
  LOGIN_ERROR_INCORRECT_PASSWORD_FOUND: {
    code: i++,
    message: 'Failed to login password incorrect {email}.',
    type: 'LOGIN_ERROR_INCORRECT_PASSWORD_FOUND',
  },
  LOGIN_ERROR_DISABLED_ACCOUNT: {
    code: i++,
    message: 'Failed to login to a disabled account {email}.',
    type: 'LOGIN_ERROR_DISABLED_ACCOUNT',
  },
  USER_ISN_T_LOGGED: {
    code: i++,
    message: "You aren't logged in to do this action.",
    type: 'USER_ISN_T_LOGGED',
  },
  ERROR_SESSION_CREDENTIALS: {
    code: i++,
    message: "Session doesn't seem correct there is no token.",
    type: 'ERROR_SESSION_CREDENTIALS',
  },
  ERROR_WHILE_CHECKING_CREDENTIALS: {
    code: i++,
    message: "Couldn't create a correct session.",
    type: 'ERROR_WHILE_CHECKING_CREDENTIALS',
  },
  GENERIC_CREDENTIALS_ERROR: {
    code: i++,
    message: 'Generic error happened while loading credentials.',
    type: 'GENERIC_CREDENTIALS_ERROR',
  },
  AUTH_BACK: {
    code: i++,
    message: 'User "{email} : {{fullName}" has logged back successfully.',
    type: 'AUTH_BACK',
  },
  LOGOUT_SUCCESS: {
    code: i++,
    message: 'User "{email} : {fullName}" has logged out successfully.',
    type: 'LOGOUT_SUCCESS',
  },
  USER_NOT_FOUND: {
    code: i++,
    message: 'User {userId} not found',
    type: 'USER_NOT_FOUND',
  },
  RESET_SUCCESS: {
    code: i++,
    message: 'Reset password email sent successfully for {email}',
    type: 'RESET_SUCCESS',
  },
  RESET_ERROR_GENERIC: {
    code: i++,
    message: 'Generic error while Reset password  sending email  {email} with error {error}',
    type: 'RESET_ERROR_GENERIC',
  },
  RESET_PASSWORD_SUCCESS: {
    code: i++,
    message: 'Password has changed successfully for {user}',
    type: 'RESET_PASSWORD_SUCCESS',
  },
  RESET_PASSWORD_SENT_SUCCESS: {
    code: i++,
    message: 'reset code i++has been sent to your email successfully',
    type: 'RESET_PASSWORD_SENT_SUCCESS',
  },
  REGISTER_SUCCESS: {
    code: i++,
    message: 'User "{email} : {fullName}" has registered successfully.',
    type: 'REGISTER_SUCCESS',
  },
  REGISTER_ERROR_GENERIC: {
    code: i++,
    message: "Error occurred while registering user '{email}': {error}",
    type: 'REGISTER_ERROR_GENERIC',
  },
  REGISTER_ERROR_INVALID_INPUT: {
    code: i++,
    message: 'Invalid input for Register : {input}',
    type: 'REGISTER_ERROR_INVALID_INPUT',
  },
  REGISTER_ERROR_EMAIL_EXIST: {
    code: i++,
    message: 'Failed to register email already exist {email}.',
    type: 'REGISTER_ERROR_EMAIL_EXIST',
  },
  REGISTER_ERROR_PASSWORD: {
    code: i++,
    message: "Password doesn't meet the requirements.",
    type: 'REGISTER_ERROR_PASSWORD',
  },
  AUTH_ERROR_GENERIC: {
    code: i++,
    message: "Error occurred while authenticating user '{email}': {error}",
    type: 'AUTH_ERROR_GENERIC',
  },
  AUTH_LOGOUT: {
    code: i++,
    message: 'User {email} has logged out successfully.',
    type: 'AUTH_LOGOUT',
  },
  USER_IS_LOGGED: {
    code: i++,
    message: 'User is already logged in.',
    type: 'USER_IS_LOGGED',
  },
  RESET_PASSWORD_TOKEN_EXPIRED_ERROR: {
    code: i++,
    message: 'your reset token has expired try to create new one',
    type: 'RESET_PASSWORD_TOKEN_EXPIRED_ERROR',
  },
  RESET_TOKEN_NOTFOUND_ERROR: {
    code: i++,
    message: 'invalid token',
    type: 'RESET_TOKEN_NOTFOUND_ERROR',
  },
  SESSION_EXPIRED: {
    code: i++,
    message: 'session expired while requesting',
    type: 'SESSION_EXPIRED',
  },
  REGISTER_ERROR_PHONE_EXIST: {
    code: i++,
    message: 'Failed to register phone already exist {phone}.',
    type: 'REGISTER_ERROR_PHONE_EXIST',
  },
  CHECK_RESET_PASSWORD_SUCCESS: {
    code: i++,
    message: 'reset password token checked succefully',
    type: 'CHECK_RESET_PASSWORD_SUCCESS',
  },
  ADMIN_VIEW_STORE_ERROR: {
    code: i++,
    message: `error while generating token for viewing store '{storeId}': {error} `,
    type: 'ADMIN_VIEW_STORE_ERROR',
  },
  ADMIN_VIEW_STORE_SUCCESS: {
    code: i++,
    message: `token generated successfully for viewing store`,
    type: 'ADMIN_VIEW_STORE_SUCCESS',
  },
} as const

export default authLogs
export const authLogger = new Logger('auth')

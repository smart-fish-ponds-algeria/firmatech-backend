import Logger from '../../utils/Logger'
export type IUserFcmTokenLogs =
  | 'INVALID_FCM_TOKEN'
  | 'CREATE_FCM_TOKEN_SUCCESS'
  | 'CREATE_FCM_TOKEN_ERROR_GENERIC'
  | 'DELETE_FCM_TOKEN_ERROR_GENERIC'
  | 'DELETE_FCM_TOKEN_SUCCESS'

let i = 0
export const userFcmTokenLogs: IErrors<IUserFcmTokenLogs> = {
  CREATE_FCM_TOKEN_SUCCESS: {
    code: i,
    message: 'fcm token created successfully.',
    type: 'CREATE_FCM_TOKEN_SUCCESS',
  },
  DELETE_FCM_TOKEN_SUCCESS: {
    code: i++,
    message: 'fcm token deleted successfully',
    type: 'DELETE_FCM_TOKEN_SUCCESS',
  },
  DELETE_FCM_TOKEN_ERROR_GENERIC: {
    code: i++,
    message: 'Error occurred while deleting user: {error}',
    messageFr: "Une erreur est survenue lors de la suppression de l'utilisateur : {error}.",
    messageAr: 'حدث خطأ أثناء حذف المستخدم: {error}.',
    type: 'DELETE_FCM_TOKEN_ERROR_GENERIC',
  },
  CREATE_FCM_TOKEN_ERROR_GENERIC: {
    code: i++,
    message: 'Error occurred while creating user fcm token: {error}',
    messageFr:
      "Une erreur est survenue lors de la création du jeton fcm de l'utilisateur : {error}.",
    messageAr: 'حدث خطأ أثناء إنشاء رمز fcm للمستخدم: {error}.',
    type: 'CREATE_FCM_TOKEN_ERROR_GENERIC',
  },
  INVALID_FCM_TOKEN: {
    code: i++,
    message: 'invalid fcmtoken',
    messageFr: 'jeton fcm invalide.',
    messageAr: 'رمز fcm غير صالح.',
    type: 'INVALID_FCM_TOKEN',
  },
} as const

export default userFcmTokenLogs
export const userFcmTokenLogger = new Logger('userFcmToken')

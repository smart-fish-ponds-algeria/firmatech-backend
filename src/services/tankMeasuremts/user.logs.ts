import Logger from '../../utils/Logger'
export type IUserLogs =
  | 'USER_NOT_FOUND'
  | 'USER_UPDATE_SUCCESS'
  | 'GET_USER_SUCCESS'
  | 'GET_ALL_USER_SUCCESS'
  | 'GET_ALL_USER_ERROR_GENERIC'
  | 'GET_USER_ERROR_GENERIC'
  | 'USER_UPDATE_ERROR_GENERIC'
  | 'GET_USER_ERROR_GENERIC'
  | 'DELETE_USER_ERROR_GENERIC'
  | 'DELETE_USER_SUCCESS'
  | 'PHONE_EXISTS'
  | 'SMS_OTP_ALGERIA_ONLY'
  | 'EMAIL_EXISTS'

export const userLogs: IErrors<IUserLogs> = {
  SMS_OTP_ALGERIA_ONLY: {
    code: 403,
    message: 'Only Algerian phone numbers are allowed to request an OTP.',
    messageFr: 'Seuls les numéros de téléphone algériens sont autorisés à demander un code OTP.',
    messageAr: 'يسمح فقط للأرقام الجزائرية بطلب رمز التحقق.',
    type: 'SMS_OTP_ALGERIA_ONLY',
  },
  GET_USER_SUCCESS: {
    code: 0,
    message: 'User with "{id}" fetched successfully.',
    type: 'GET_USER_SUCCESS',
  },
  GET_ALL_USER_SUCCESS: {
    code: 1,
    message: 'Users fetched successfully',
    type: 'GET_ALL_USER_SUCCESS',
  },
  USER_UPDATE_SUCCESS: {
    code: 2,
    message: 'User with "{id}" has been updated successfully',
    type: 'USER_UPDATE_SUCCESS',
  },
  DELETE_USER_SUCCESS: {
    code: 3,
    message: 'User with "{id}" deleted successfully.',
    type: 'DELETE_USER_SUCCESS',
  },
  DELETE_USER_ERROR_GENERIC: {
    code: 7,
    message: 'Error occurred while deleting user: {error}',
    messageFr: "Une erreur est survenue lors de la suppression de l'utilisateur : {error}.",
    messageAr: 'حدث خطأ أثناء حذف المستخدم: {error}.',
    type: 'DELETE_USER_ERROR_GENERIC',
  },
  USER_UPDATE_ERROR_GENERIC: {
    code: 8,
    message: 'Error occurred while updating user: {error}',
    messageFr: "Une erreur est survenue lors de la mise à jour de l'utilisateur : {error}.",
    messageAr: 'حدث خطأ أثناء تحديث المستخدم: {error}.',
    type: 'USER_UPDATE_ERROR_GENERIC',
  },
  USER_NOT_FOUND: {
    code: 18,
    message: 'User {userId} not found',
    messageFr: 'Utilisateur {userId} non trouvé.',
    messageAr: 'المستخدم {userId} غير موجود.',
    type: 'USER_NOT_FOUND',
  },
  GET_USER_ERROR_GENERIC: {
    code: 19,
    message: 'Error occurred while getting user: {error}',
    messageFr: "Une erreur est survenue lors de l'obtention de l'utilisateur : {error}.",
    messageAr: 'حدث خطأ أثناء الحصول على المستخدم: {error}.',
    type: 'GET_USER_ERROR_GENERIC',
  },
  GET_ALL_USER_ERROR_GENERIC: {
    code: 20,
    message: 'Error occurred while getting all users: {error}',
    messageFr: "Une erreur est survenue lors de l'obtention de tous les utilisateurs : {error}.",
    messageAr: 'حدث خطأ أثناء الحصول على جميع المستخدمين: {error}.',
    type: 'GET_ALL_USER_ERROR_GENERIC',
  },
  PHONE_EXISTS: {
    code: 21,
    message: 'User with the phone: {phone} already exists',
    messageFr: "L'utilisateur avec le téléphone : {phone} existe déjà.",
    messageAr: 'المستخدم برقم الهاتف {phone} موجود بالفعل.',
    type: 'PHONE_EXISTS',
  },
  EMAIL_EXISTS: {
    code: 22,
    message: 'User with the email: {email} already exists',
    messageFr: "L'utilisateur avec l'email : {email} existe déjà.",
    messageAr: 'المستخدم بالبريد الإلكتروني {email} موجود بالفعل.',
    type: 'EMAIL_EXISTS',
  },
} as const

export default userLogs
export const userLogger = new Logger('user')

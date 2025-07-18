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
  | 'PHONE_ALREADY_VERIFIED_ERR'
  | 'INVALID_OPT_CODE'
  | 'SMS_VERIFICATION_RETRY_LIMIT'
  | 'EMAIL_NOT_VERIFIED'
  | 'EMAIL_VERIFIED_SUCCESS'
  | 'EMAIL_VERIFIED_ERROR'
  | 'INVALID_VERIFICATION_CODE'
  | 'EMAIL_VERIFICATION_CODE_EXPIRED'
  | 'EMAIL_VERIFICATION_SENT_SUCCESS'
  | 'DISPOSABLE_EMAIL'
  | 'ACESS_STORE_DENIED'
  | 'INVALID_NAME'

let i = 0
export const authLogs: IErrors<IAuthLogs> = {
  INVALID_NAME: {
    code: i++,
    message: 'First name or last name must not contain special characters.',
    messageFr: 'Le prénom ou le nom de famille ne doit pas contenir de caractères spéciaux.',
    messageAr: 'يجب ألا يحتوي الاسم الأول أو الاسم الأخير على أحرف خاصة.',
    type: 'INVALID_NAME',
  },
  ACESS_STORE_DENIED: {
    code: i++,
    message: 'You dont have access to this store',
    messageFr: "Vous n'avez pas accès à ce magasin",
    messageAr: 'ليس لديك حق الوصول إلى هذا المتجر',
    type: 'ACESS_STORE_DENIED',
  },
  DISPOSABLE_EMAIL: {
    code: i++,
    message: 'Disposable email detected: {email}. Registration is not allowed.',
    messageFr: "Adresse e-mail jetable détectée : {email}. L'inscription n'est pas autorisée.",
    messageAr: 'تم اكتشاف بريد إلكتروني مؤقت: {email}. التسجيل غير مسموح به.',
    type: 'DISPOSABLE_EMAIL',
  },

  EMAIL_VERIFICATION_SENT_SUCCESS: {
    code: i++,
    message: 'Verification email sent successfully to {email}.',
    messageFr: 'E-mail de vérification envoyé avec succès à {email}.',
    messageAr: 'تم إرسال بريد التحقق بنجاح إلى {email}.',
    type: 'EMAIL_VERIFICATION_SENT_SUCCESS',
  },
  EMAIL_VERIFICATION_CODE_EXPIRED: {
    code: i++,
    message: 'The email verification code has expired. Please request a new one.',
    messageFr: "Le code de vérification de l'email a expiré. Veuillez en demander un nouveau.",
    messageAr: 'انتهت صلاحية رمز التحقق من البريد الإلكتروني. يرجى طلب رمز جديد.',
    type: 'EMAIL_VERIFICATION_CODE_EXPIRED',
  },
  INVALID_VERIFICATION_CODE: {
    code: i++,
    message: 'Invalid verification code provided.',
    messageFr: 'Code de vérification invalide fourni.',
    messageAr: 'تم توفير رمز تحقق غير صالح.',
    type: 'INVALID_VERIFICATION_CODE',
  },
  EMAIL_NOT_VERIFIED: {
    code: i++,
    message: 'Email is not verified for {email}.',
    messageFr: "L'email n'est pas vérifié pour {email}.",
    messageAr: 'البريد الإلكتروني غير مُحقق لـ {email}.',
    type: 'EMAIL_NOT_VERIFIED',
  },
  EMAIL_VERIFIED_SUCCESS: {
    code: i++,
    message: 'Email verified successfully for {email}.',
    messageFr: "L'email a été vérifié avec succès pour {email}.",
    messageAr: 'تم التحقق من البريد الإلكتروني بنجاح لـ {email}.',
    type: 'EMAIL_VERIFIED_SUCCESS',
  },
  EMAIL_VERIFIED_ERROR: {
    code: i++,
    message: 'Error occurred while verifying email {email}: {error}.',
    messageFr: "Une erreur s'est produite lors de la vérification de l'email {email}: {error}.",
    messageAr: 'حدث خطأ أثناء التحقق من البريد الإلكتروني {email}: {error}.',
    type: 'EMAIL_VERIFIED_ERROR',
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
    message: "Error occurred while logging in user '{email}': {error}",
    type: 'LOGIN_ERROR_GENERIC',
    messageFr: "Erreur lors de la connexion de l'utilisateur '{email}': {error}",
    messageAr: "حدث خطأ أثناء تسجيل دخول المستخدم '{email}': {error}",
  },
  PHONE_ALREADY_VERIFIED_ERR: {
    code: i++,
    message: 'phone is already verified',
    messageFr: 'Le téléphone est déjà vérifié.',
    messageAr: 'الهاتف تم التحقق منه بالفعل.',
    type: 'PHONE_ALREADY_VERIFIED_ERR',
  },
  INVALID_OPT_CODE: {
    code: i++,
    message: 'OTP code is not valid.',
    messageFr: "Le code OTP n'est pas valide.",
    messageAr: 'رمز OTP غير صالح.',
    type: 'INVALID_OPT_CODE',
  },
  SMS_VERIFICATION_RETRY_LIMIT: {
    code: i++,
    message: 'You need to wait until after time:{time} to resend',
    messageFr: 'Vous devez attendre après {time} pour renvoyer.',
    messageAr: 'يجب عليك الانتظار حتى بعد {time} لإعادة الإرسال.',
    type: 'SMS_VERIFICATION_RETRY_LIMIT',
  },
  LOGIN_ERROR_INVALID_INPUT: {
    code: i++,
    message: 'Invalid input for Log in: {input}.',
    messageFr: 'Entrée invalide pour la connexion : {input}.',
    messageAr: 'إدخال غير صالح لتسجيل الدخول: {input}.',
    type: 'LOGIN_ERROR_INVALID_INPUT',
  },
  LOGIN_ERROR_EMAIL_NOT_FOUND: {
    code: i++,
    message: "Failed to login email doesn't exist {email}.",
    messageFr: "Échec de la connexion. L'email {email} n'existe pas.",
    messageAr: 'فشل في تسجيل الدخول. البريد الإلكتروني {email} غير موجود.',
    type: 'LOGIN_ERROR_EMAIL_NOT_FOUND',
  },
  LOGIN_ERROR_INCORRECT_PASSWORD_FOUND: {
    code: i++,
    message: 'Failed to login password incorrect {email}.',
    messageFr: "Échec de la connexion. Le mot de passe est incorrect pour l'email {email}.",
    messageAr: 'فشل في تسجيل الدخول. كلمة المرور غير صحيحة للبريد الإلكتروني {email}.',
    type: 'LOGIN_ERROR_INCORRECT_PASSWORD_FOUND',
  },
  LOGIN_ERROR_DISABLED_ACCOUNT: {
    code: i++,
    message: 'Failed to login to a disabled account {email}.',
    messageFr: 'Échec de la connexion à un compte désactivé {email}.',
    messageAr: 'فشل في تسجيل الدخول إلى حساب معطل {email}.',
    type: 'LOGIN_ERROR_DISABLED_ACCOUNT',
  },
  USER_ISN_T_LOGGED: {
    code: i++,
    message: "You aren't logged in to do this action.",
    messageFr: "Vous n'êtes pas connecté pour effectuer cette action.",
    messageAr: 'أنت لست مسجلاً للدخول للقيام بهذا الإجراء.',

    type: 'USER_ISN_T_LOGGED',
  },
  ERROR_SESSION_CREDENTIALS: {
    code: i++,
    message: "Session doesn't seem correct there is no token.",
    messageFr: "La session ne semble pas correcte, il n'y a pas de jeton.",
    messageAr: 'الجلسة لا تبدو صحيحة، لا يوجد رمز.',
    type: 'ERROR_SESSION_CREDENTIALS',
  },
  ERROR_WHILE_CHECKING_CREDENTIALS: {
    code: i++,
    message: "Couldn't create a correct session.",
    messageFr: 'Impossible de créer une session correcte.',
    messageAr: 'تعذّر إنشاء جلسة صحيحة.',
    type: 'ERROR_WHILE_CHECKING_CREDENTIALS',
  },
  GENERIC_CREDENTIALS_ERROR: {
    code: i++,
    message: 'Generic error happened while loading credentials.',
    messageFr: "Une erreur générique s'est produite lors du chargement des identifiants.",
    messageAr: 'حدث خطأ عام أثناء تحميل بيانات الاعتماد.',
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
    message: 'User {userId} not found.',
    messageFr: 'Utilisateur {userId} non trouvé.',
    messageAr: 'المستخدم {userId} غير موجود.',
    type: 'USER_NOT_FOUND',
  },
  RESET_SUCCESS: {
    code: i++,
    message: 'Reset password email sent successfully for {email}',
    type: 'RESET_SUCCESS',
  },
  RESET_ERROR_GENERIC: {
    code: i++,
    message: 'Generic error while resetting password, sending email {email} with error {error}.',
    messageFr:
      "Erreur générique lors de la réinitialisation du mot de passe, envoi de l'email {email} avec l'erreur {error}.",
    messageAr:
      'خطأ عام أثناء إعادة تعيين كلمة المرور، إرسال البريد الإلكتروني {email} مع الخطأ {error}.',
    type: 'RESET_ERROR_GENERIC',
  },
  RESET_PASSWORD_SUCCESS: {
    code: i++,
    message: 'Password has changed successfully for {user}',
    type: 'RESET_PASSWORD_SUCCESS',
  },
  RESET_PASSWORD_SENT_SUCCESS: {
    code: i++,
    message: 'reset code has been sent to your email successfully',
    type: 'RESET_PASSWORD_SENT_SUCCESS',
  },
  REGISTER_SUCCESS: {
    code: i++,
    message: 'User "{email} : {fullName}" has registered successfully.',
    type: 'REGISTER_SUCCESS',
  },
  REGISTER_ERROR_GENERIC: {
    code: i++,
    message: "Error occurred while registering user '{email}': {error}.",
    messageFr:
      "Une erreur est survenue lors de l'enregistrement de l'utilisateur '{email}': {error}.",
    messageAr: "حدث خطأ أثناء تسجيل المستخدم '{email}': {error}.",
    type: 'REGISTER_ERROR_GENERIC',
  },
  REGISTER_ERROR_INVALID_INPUT: {
    code: i++,
    message: 'Invalid input for Register: {input}.',
    messageFr: "Entrée invalide pour l'enregistrement : {input}.",
    messageAr: 'إدخال غير صالح للتسجيل: {input}.',
    type: 'REGISTER_ERROR_INVALID_INPUT',
  },
  REGISTER_ERROR_EMAIL_EXIST: {
    code: i++,
    message: 'Failed to register, email already exists {email}.',
    messageFr: "Échec de l'enregistrement, l'email existe déjà {email}.",
    messageAr: 'فشل في التسجيل، البريد الإلكتروني موجود بالفعل {email}.',
    type: 'REGISTER_ERROR_EMAIL_EXIST',
  },
  REGISTER_ERROR_PASSWORD: {
    code: i++,
    message: "Password doesn't meet the requirements.",
    messageFr: 'Le mot de passe ne respecte pas les exigences.',
    messageAr: 'كلمة المرور لا تلبي المتطلبات.',
    type: 'REGISTER_ERROR_PASSWORD',
  },
  AUTH_ERROR_GENERIC: {
    code: i++,
    message: "Error occurred while authenticating user '{email}': {error}.",
    messageFr:
      "Une erreur est survenue lors de l'authentification de l'utilisateur '{email}': {error}.",
    messageAr: "حدث خطأ أثناء مصادقة المستخدم '{email}': {error}.",
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
    messageFr: "L'utilisateur est déjà connecté.",
    messageAr: 'المستخدم مسجّل الدخول بالفعل.',
    type: 'USER_IS_LOGGED',
  },
  RESET_PASSWORD_TOKEN_EXPIRED_ERROR: {
    code: i++,
    message: 'Your reset token has expired. Try to create a new one.',
    messageFr: "Votre jeton de réinitialisation a expiré. Essayez d'en créer un nouveau.",
    messageAr: 'لقد انتهت صلاحية رمز إعادة تعيينك. حاول إنشاء واحد جديد.',
    type: 'RESET_PASSWORD_TOKEN_EXPIRED_ERROR',
  },
  RESET_TOKEN_NOTFOUND_ERROR: {
    code: i++,
    message: 'Invalid token.',
    messageFr: 'Jeton invalide.',
    messageAr: 'رمز غير صالح.',
    type: 'RESET_TOKEN_NOTFOUND_ERROR',
  },
  SESSION_EXPIRED: {
    code: i++,
    message: 'Session expired while requesting.',
    messageFr: 'La session a expiré lors de la demande.',
    messageAr: 'انتهت صلاحية الجلسة أثناء الطلب.',
    type: 'SESSION_EXPIRED',
  },
  REGISTER_ERROR_PHONE_EXIST: {
    code: i++,
    message: 'Failed to register, phone already exists {phone}.',
    messageFr: "Échec de l'enregistrement, le téléphone existe déjà {phone}.",
    messageAr: 'فشل في التسجيل، الهاتف موجود بالفعل {phone}.',
    type: 'REGISTER_ERROR_PHONE_EXIST',
  },
  CHECK_RESET_PASSWORD_SUCCESS: {
    code: i++,
    message: 'reset password token checked succefully',
    type: 'CHECK_RESET_PASSWORD_SUCCESS',
  },
} as const

export default authLogs
export const authLogger = new Logger('auth')

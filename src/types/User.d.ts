declare interface UserAuthI {
  email: string
  password: string
}

declare interface UserI extends UserAuthI {
  firstName: string
  emailVerificationCodeExpiry?: Date
  LastsmsVerificationDate?: number
  lastName: string
  isEmailVerified: boolean
  emailVerificationCode?: string
  passwordResetToken?: number
  passwordVerifyToken?: number
  passwordVerifyExpiry?: number
  passwordResetExpiry?: number
  skipToken?: string
  fcmTokens: string[]
  expoToken?: string
  lang?: 'en' | 'fr' | 'ar'
}

// declare type UserPopulated = PopulatedItem<UserI>

declare interface AdminI extends UserAuthI {
  role: 'admin' | 'superAdmin'
  firstName: string
  lastName: string
  passwordResetToken?: number
  passwordResetExpiry?: number
  skipToken?: string
  fcmTokens: string[]
}

type OptimizedUser = Omit<UserI, 'password skipToken passwordResetToken passwordResetExpiry'> & {
  _id: string
}

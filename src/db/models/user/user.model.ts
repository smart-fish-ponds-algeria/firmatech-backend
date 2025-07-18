import { Model, Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import { validateEmail } from '../../../utils/Function'
import validator from 'validator'

const required = true

export interface UserD extends Document<UserI>, UserI {
  comparePasswords(password: string): Promise<boolean>
  Optimize(): OptimizedUser
}

export interface UserModel extends Model<UserD> {
  findUser(id: string): Promise<UserI>
}

const usersSchema = new Schema<UserI>(
  {
    firstName: { type: String, required },
    lastName: { type: String, required },
    LastsmsVerificationDate: { type: Number, required: false },
    email: {
      type: String,
      required,
      validate: [validateEmail, 'Please fill a valid email address'],
      unique: true,
    },
    password: { type: String, required },
    passwordVerifyToken: { type: Number, default: null },
    passwordVerifyExpiry: { type: Number, default: null },
    passwordResetToken: { type: Number, default: null },
    passwordResetExpiry: { type: Number, default: null },
    skipToken: { type: String, default: null },
    fcmTokens: { type: [String], default: [] },
    lang: { type: String, required: false, default: 'en' },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String, required: false, unique: false },
    emailVerificationCodeExpiry: { type: Date, required: false },
  },
  { timestamps: true }
)

usersSchema.index({ email: 1 }, { unique: true })

usersSchema.pre('save', async function (next) {
  try {
    if (this.isNew || this.isModified('password')) {
      if (this.password.length < 8) throw new Error('Password must be at least 8 characters long')
      this.password = await bcrypt.hash(this.password, 10)
    }
    next()
  } catch (err) {
    next(err as Error)
  }
})

usersSchema.set('toJSON', { virtuals: true })

usersSchema.methods.Optimize = function () {
  const obj = this.toObject()
  delete obj.password
  delete obj.passwordResetToken
  delete obj.passwordResetExpiry
  delete obj.skipToken
  delete obj.fcmTokens
  delete obj.smsVerifyToken
  delete obj.smsVerifyExpiry
  delete obj.passwordVerifyToken
  delete obj.passwordVerifyExpiry
  delete obj.otpSentDate
  delete obj.emailVerificationCode
  delete obj.__v
  return obj
}

usersSchema.methods.comparePasswords = async function (candidatePassword: string) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch {
    return false
  }
}

export const UserModel = model<UserI, UserModel>('Users', usersSchema)

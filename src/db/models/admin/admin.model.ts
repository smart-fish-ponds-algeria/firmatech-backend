import { Model, Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import { validateEmail } from '../../../utils/Function'
const required = true
export interface AdminD extends Document<AdminI>, AdminI {
  comparePasswords(password: string): Promise<boolean>
  Optimize(): OptimizedUser
}

export interface UserModel extends Model<AdminD> {
  findUser(id: string): Promise<AdminI>
}
const adminSchema = new Schema<AdminD>({
  firstName: { type: String, required },
  lastName: { type: String, required },
  role: { type: String, required },
  email: {
    type: String,
    required,
    validate: [validateEmail, 'Please fill a valid email address'],
    unique: true,
  },
  password: { type: String, required },
  passwordResetToken: { type: Number, default: null },
  passwordResetExpiry: { type: Number, default: null },
  skipToken: { type: String, default: null },
  fcmTokens: { type: [String], default: [] },
})


adminSchema.index({ email: 1 }, { unique: true })
adminSchema.pre('save', async function (next) {
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

adminSchema.set('toJSON', { virtuals: true })

adminSchema.methods.Optimize = function () {
  const obj = this.toObject()
  delete obj.password
  delete obj.passwordResetToken
  delete obj.passwordResetExpiry
  delete obj.skipToken
  delete obj.fcmTokens
  return obj
}

adminSchema.methods.comparePasswords = async function (candidatePassword: string) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch {
    return false
  }
}

export const AdminModel = model<AdminD>('Admins', adminSchema)

import { sendWelcomeEmailTemplate } from './welcomeTemplate/app'
import { EMAIL_USER, EMAIL_SECRET } from '../config/EnvProvider'

export { sendWelcomeEmailTemplate }

const usedEmail = EMAIL_USER
const service = 'gmail'
const user = EMAIL_USER
const password = EMAIL_SECRET

export { usedEmail, service, user, password }

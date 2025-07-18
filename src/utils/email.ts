import { createTransport } from 'nodemailer'

import { EmailArgs } from '../types/email'
import { EMAIL_USER, EMAIL_SECRET } from '../config/EnvProvider'
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_SECRET,
  },
})
export function verifySMTPConnection() {
  transporter.verify(function (error) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email Server is ready to take our messages')
    }
  })
}
export async function sendMail({ html, text, email, subject }: EmailArgs) {
  try {
    await transporter.sendMail({
      from: ` <${EMAIL_USER}>`,
      to: email,
      subject,
      text,
      html,
    })
  } catch {
    throw new Error('error sending email ')
  }
}

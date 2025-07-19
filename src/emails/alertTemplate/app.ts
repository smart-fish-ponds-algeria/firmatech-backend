import * as fs from 'fs'
import * as nodemailer from 'nodemailer'
import Handlebars from 'handlebars'
import { usedEmail, user, password, service } from '../index'
import dotenv from 'dotenv'
dotenv.config()

export async function sendEmailAlertTemplate(
  receiverEmail: string,
  firstName: string,
  lastName: string,
  details: {
    timestamp: string
    water_level: number
    suspended_solids: number
    salinity: number
    pH: number
    nitrite: number
    nitrate: number
    ammonia: number
    temperature: number
    O2: number
  },
  anomalies: string
) {
  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: user,
      pass: password,
    },
  })

  try {
    await transporter.verify()
    console.log('Server is ready to take our messages')
  } catch (error) {
    console.error('Error verifying transporter:', error)
    throw error
  }

  // Read HTML template
  let htmlTemplate = fs.readFileSync('dist/emails/alertTemplate/en.html', 'utf-8')

  // Compile the template with Handlebars
  const template = Handlebars.compile(htmlTemplate)

  // Define data to pass to the template
  const replacements = {
    firstName,
    lastName,
    details,
    anomalies,
  }

  // Generate the personalized HTML
  const personalizedHtml = template(replacements)

  // Define email options
  const mailOptions = {
    from: usedEmail,
    to: receiverEmail,
    subject: 'Email Verification',
    html: personalizedHtml,
  }

  // Send email
  try {
    await transporter.sendMail(mailOptions)
    console.log(`Email sent to ${receiverEmail}`)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

import * as fs from 'fs'
import * as nodemailer from 'nodemailer'
import Handlebars from 'handlebars'
import { usedEmail, service, user, password } from '../index'
import dotenv from 'dotenv'
dotenv.config()

export async function sendWelcomeEmailTemplate(
  lang: 'en' | 'ar' | 'fr',
  receiverEmail: string,
  firstName: string,
  lastName: string,
  confirmEmailLink: string
) {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: user,
      pass: password,
    },
  })

  // Verify connection configuration
  try {
    await transporter.verify()
    console.log('Server is ready to take our messages')
  } catch (error) {
    console.error('Error verifying transporter:', error)
    throw error
  }

  // Read HTML template
  let htmlTemplate: string
  if (lang === 'en') {
    htmlTemplate = fs.readFileSync('dist/emails/welcomeTemplate/en.html', 'utf-8')
  } else if (lang === 'ar') {
    htmlTemplate = fs.readFileSync('dist/emails/welcomeTemplate/ar.html', 'utf-8')
  } else if (lang === 'fr') {
    htmlTemplate = fs.readFileSync('dist/emails/welcomeTemplate/fr.html', 'utf-8')
  } else {
    throw new Error('Unsupported language')
  }

  // Compile the template with Handlebars
  const template = Handlebars.compile(htmlTemplate)

  // Define data to pass to the template
  const replacements = {
    firstName,
    lastName,
    confirmEmailLink,
  }

  // Generate the personalized HTML
  const personalizedHtml = template(replacements)
  // Define email options
  const mailOptions = {
    from: usedEmail,
    to: receiverEmail,
    subject: 'Welcome to FirmaTech!',
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
// getAllDayReports

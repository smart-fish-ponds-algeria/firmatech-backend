import { randomBytes } from 'crypto'
import { CookieOptions } from 'express'
import { NODE_ENV } from '../config/EnvProvider'
export function validateEmail(email: string) {
  if (email) return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email)
  return true
}

export function log(message: string, ...optionalParams: any[]) {
  if (NODE_ENV !== 'test') {
    console.log(message, ...optionalParams)
  }
}

export function RandomEmail() {
  return Math.random().toString(36).substring(7) + '@gmail.com'
}

export function RandomPassword() {
  return randomBytes(10).toString('hex')
}

export function RandomString() {
  return Math.random().toString(36).substring(8)
}

export function getCookiesSettings(stay: boolean = false): CookieOptions {
  return {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    ...(stay ? { expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000) } : {}),
  }
}

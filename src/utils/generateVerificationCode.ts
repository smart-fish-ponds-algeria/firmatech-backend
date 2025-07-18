// import { createHash, randomBytes } from 'crypto'
//
// const HASH_CODE_LENGTH = 6
// export function generateVerificationCode() {
//   const verifyCode = randomBytes(12).toString('hex')
//   const verificationCode = createHash('sha256')
//     .update(verifyCode)
//     .digest('hex')
//     .slice(0, HASH_CODE_LENGTH)
//   return verificationCode
// }
import { createHash, randomBytes } from 'crypto'

const HASH_CODE_LENGTH = 6
export function generateVerificationCode() {
  const verifyCode = randomBytes(12).toString('hex')
  const verificationCode = createHash('sha256')
    .update(verifyCode)
    .digest('hex')
    // Convert letters to numbers by replacing a-f with 0-5
    .replace(/[a-f]/g, (char) => String(char.charCodeAt(0) - 97))
    .slice(0, HASH_CODE_LENGTH)
  return verificationCode
}

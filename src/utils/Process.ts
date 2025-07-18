import { ExitCodes } from '../config/Errors'
import { formatString } from './Strings'
import { globalLogger as logger } from './Logger'

export async function exitProcess(code: ICode, moreData: Record<string, string> = {}) {
  const exitCode = code || ExitCodes.ERROR_GENERIC
  const message = formatString(exitCode.message, moreData)
  logger.error(message, { code: exitCode.code, type: 'ExitCode' })
  console.error(`📛 Exiting with code: ${exitCode.code}`)
  console.error('❌ Reason:', message)
  process.exit(exitCode.code)
}

import winston, { Logform } from 'winston'
import path from 'path'
import { subDays } from 'date-fns'
import { log } from './Function'
import { IN_DEVELOPMENT, InTest, LogsRoot } from '../config/EnvProvider'

const printf = (info: Logform.TransformableInfo) => {
  const errorCode = info.code ? ` | ${info.code}` : ''
  const logType = info.type ? ` | ${info.type}` : ''
  return `${info.timestamp} [${info.level?.toUpperCase()}${logType}${errorCode}]: ${info.message}`
}

export default class Logger {
  private logger: winston.Logger
  constructor(model: string, defaultFormat: (info: Logform.TransformableInfo) => string = printf) {
    // Create the logger with the defined transports
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          level: 'silly',
          filename: path.join(LogsRoot || '', model + '.log'),
          format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        ...(IN_DEVELOPMENT
          ? [
              new winston.transports.File({
                level: 'silly',
                filename: path.join(LogsRoot, model + '.dev.log'),
                format: winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.printf(defaultFormat)
                ),
              }),
              new winston.transports.Console({
                level: 'silly',
                format: winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.printf(defaultFormat)
                ),
              }),
            ]
          : []),
      ],
    })

    this.logger.on('log', (logInfo) => {
      log(`${model} Log event emitted: ${logInfo}`)
    })

    this.logger.on('error', (error) => {
      console.error(`${model} Error event emitted: `, error)
    })

    // Event listener for 'finish' event
    this.logger.addListener('finish', () => {
      // Your custom handling logic after the logger finishes processing a log message
      log(`${model} Finish event emitted`)
    })
  }
  onFinish(callback: () => void) {
    this.logger.on('finish', callback)
  }

  async ReadLogs(logLevel: string, numDaysFrom: number = 1, numDaysTo: number = 0) {
    const from = subDays(new Date(), numDaysFrom)
    const to = subDays(new Date(), numDaysTo)
    try {
      return await new Promise((resolve, reject) => {
        // @ts-expect-error winston logger query method is not properly typed
        this.logger.query({ level: logLevel, from, until: to }, (err, results) => {
          if (err) reject(err)
          else resolve(results.file)
        })
      })
    } catch (e) {
      globalLogger.error((e as Error).message, { code: 0, type: 'Reading Logs' })
    }
    /* )*/
  }

  error(message: string, meta?: any) {
    this.logger.log('error', message, meta)
  }
  warn(message: string, meta?: any) {
    this.logger.log('warn', message, meta)
  }
  http(message: string, meta?: any) {
    this.logger.log('http', message, meta)
  }
  info(message: string, meta?: any) {
    if (InTest) return

    this.logger.log('info', message, meta)
  }
  verbose(message: string, meta?: any) {
    this.logger.log('verbose', message, meta)
  }
  debug(message: string, meta?: any) {
    if (InTest) return

    log('debug :', { message, meta })
    this.logger.debug(message, meta)
  }
  silly(message: string, meta?: any) {
    this.logger.log('silly', message, meta)
  }
}

export const globalLogger = new Logger('global')

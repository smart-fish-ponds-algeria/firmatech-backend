import mongoose from 'mongoose'
import {
  IN_DEVELOPMENT,
  MONGODB_NAME,
  MONGODB_URI,
} from './config/EnvProvider'
import { exitProcess } from './utils/Process'
import { ExitCodes } from './config/Errors'
import { setTimeout } from 'timers/promises'
import { log } from './utils/Function'

const mongooseOptions = {
  dbName: MONGODB_NAME,
}

if (IN_DEVELOPMENT) mongoose.set('debug', true)

export const db = mongoose
  .connect(MONGODB_URI, mongooseOptions)
  .then(async () => {
    log(`🗄️  ==> '${MONGODB_NAME}' DB is Connected.`)
  })
  .catch((err) => {
    console.log(err)
  })

mongoose.connection.on('error', () => {})
export default class System {
  static async ProcessError(second: number) {
    setTimeout(second * 1000).then(() => {
      exitProcess(ExitCodes.ERROR_GENERIC, { error: 'Manual termination after timeout' })
    })
  }
  static async Start() {
    await db
  }
  static async Stop() {
    await mongoose.disconnect()
  }
}

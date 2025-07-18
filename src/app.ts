import express from 'express'
import './config/EnvProvider'
import cookieParser from 'cookie-parser'
import * as cron from 'node-cron'
import cors from 'cors'
import { errorMiddleware } from './utils/Errors'
import { ErrorResponse } from './utils/Response'
import { HttpCodes } from './config/Errors'
import System from './settings'
import SetRouters from './routes/index'
import multer from 'multer'
import { IN_PRODUCTION, NODE_ENV, PORT, SESSION_SECRET } from './config/EnvProvider'
import session from 'express-session'
import { fetchingMeasureScheduler } from './tasks/scheduler'
export const app = express()
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore(),
    rolling: true,
    unset: 'keep',
    proxy: true,
  })
)

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3000/', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
multer()
app.use(express.text())
app.use(cookieParser())
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf
    },
  })
)
app.use(express.urlencoded({ extended: true }))
SetRouters(app)

app.set('trust proxy', true)

// Fallback route for undefined routes
app.use('*', (_req, res) =>
  ErrorResponse(res, HttpCodes.NotImplemented.code, HttpCodes.NotImplemented.message)
)

// Error handling middleware
app.use(errorMiddleware)

console.log('in production: ', IN_PRODUCTION)

if (NODE_ENV !== 'test') {
  System.Start().then(async () => {
    app.listen(PORT, () => {
      const port_msg = `Server running on port: ${PORT}.`
      const url_msg = `The backend is open in: http://localhost:${PORT} .`
      const max_length = Math.max(url_msg.length, port_msg.length) + 4
      const n = Math.floor((max_length - port_msg.length) / 2)
      const m = Math.floor((max_length - url_msg.length) / 2)

      console.log(' ' + '-'.repeat(max_length))
      console.log(`|${' '.repeat(n)}${port_msg}${' '.repeat(n)}|`)
      console.log(`|${' '.repeat(m)}${url_msg}${' '.repeat(m)}|`)
      console.log(' ' + '-'.repeat(max_length))
      cron.schedule('35 23 * * *', async () => {
        try {
          await fetchingMeasureScheduler()
        } catch (err) {
          console.error('Error running the scheduled task:', err)
        }
      })
    })
  })
}

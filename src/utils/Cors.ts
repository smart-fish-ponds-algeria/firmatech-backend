import { CorsOptions } from 'cors'

export const ProductionCors: CorsOptions = {
  origin: (origin, callback) => {
    if (
      origin === 'https://confermilo-dashboard-clone.vercel.app/' ||
      origin === 'http://localhost:3000/'
    ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
export const DevCors: CorsOptions = {
  origin: (origin, callback) => {
    if (
      origin === 'https://confermilo-dashboard-clone.vercel.app/' ||
      origin === 'http://localhost:3000/'
    ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
    callback(null, origin)
  },
  credentials: true,
}

import { ObjectId } from 'mongoose'

export interface TankMeasurementsI {
  tankId: ObjectId
  timestamp: string
  water_level: number
  suspended_solids: number
  salinity: number
  pH: number
  nitrite: number
  nitrate: number
  ammonia: number
}

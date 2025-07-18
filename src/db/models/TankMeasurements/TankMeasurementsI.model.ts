import { Schema, model, Document } from 'mongoose'
import { TankMeasurementsI } from '../../../types/tankMeasurements'

const required = true

export interface TankMeasurementsD extends Document<TankMeasurementsI>, TankMeasurementsI {}

const tankMeasurementSchema = new Schema<TankMeasurementsI>(
  {
    ammonia: { type: Number, required },
    nitrate: { type: Number, required },
    nitrite: { type: Number, required },
    pH: { type: Number, required },
    salinity: { type: Number, required },
    suspended_solids: { type: Number, required },
    timestamp: { type: String, required },
    tankId: { type: Schema.Types.ObjectId, ref: 'WaterTanks' },
  },
  { timestamps: true }
)

export const TankMeasurementsModel = model<TankMeasurementsI>(
  'TankMeasurements',
  tankMeasurementSchema
)

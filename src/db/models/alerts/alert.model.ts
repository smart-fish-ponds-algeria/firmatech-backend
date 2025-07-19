import { Schema, model, Document } from 'mongoose'
import { ReportI } from '../../../types/report'
import { AlertI } from '../../../types/alert'

const required = true

export interface AlertD extends Document<AlertI>, AlertI {}

const alertSchema = new Schema<AlertI>(
  {
    anomalies: { type: Schema.Types.String, required },
    tankId: { type: Schema.Types.ObjectId, ref: 'WaterTanks' },
  },
  { timestamps: true }
)

export const AlertModel = model<AlertI>('Alerts', alertSchema)

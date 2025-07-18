import { Schema, model, Document } from 'mongoose'
import { ReportI } from '../../../types/report'

const required = true

export interface ReportD extends Document<ReportI>, ReportI {}

const reportsSchema = new Schema<ReportI>(
  {
    day: { type: Schema.Types.String, required },
    content: { type: Schema.Types.String, required },
    tankId: { type: Schema.Types.ObjectId, ref: 'WaterTanks' },
  },
  { timestamps: true }
)

export const ReportModel = model<ReportI>('Reports', reportsSchema)

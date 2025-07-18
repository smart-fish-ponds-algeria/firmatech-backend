import { Model, Schema, model, Document } from 'mongoose'
import { FishedDetails, WaterTankDetails, WaterTankI } from '../../../types/waterTank'

const required = true

export interface WaterTankD extends Document<WaterTankI> {}

const tankDetailsSchema = new Schema<WaterTankDetails>({
  length: { type: Number, required },
  volume: { type: Number, required },
  width: { type: Number, required },
})

const fishesDetailsSchema = new Schema<FishedDetails>({
  total_fish_sick: { type: Number, required },
  total_fish_count: { type: Number, required },
  fish_weight: { type: Number, required },
  fish_lenght: { type: Number, required },
})
const waterTanksSchema = new Schema<WaterTankI>(
  {
    details: { type: tankDetailsSchema, required },
    responsible: { type: Schema.Types.ObjectId, ref: 'Users' },
    isActive: { type: Schema.Types.Boolean, required, default: false },
    fishDetails: { type: fishesDetailsSchema, required },
    hasSick: { type: Boolean, required, default: false },
  },
  { timestamps: true }
)

export const WaterTankModel = model<WaterTankI>('WaterTanks', waterTanksSchema)

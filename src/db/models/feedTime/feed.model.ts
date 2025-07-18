import { Schema, model, Document } from 'mongoose'
import { FeedI } from '../../../types/feed'

const required = true

export interface FeedD extends Document<FeedI>, FeedI {}

const feedSchema = new Schema<FeedI>(
  {
    tankId: { type: Schema.Types.ObjectId, ref: 'WaterTanks', required },
  },
  { timestamps: true }
)

export const FeedModel = model<FeedI>('Feed', feedSchema)

import { ObjectId } from 'mongoose'

export interface FeedI {
  tankId: ObjectId
  day: string
}

import { ObjectId } from 'mongoose'

export interface FeedI {
  tankId: ObjectId
  qte: number
  day: string
}

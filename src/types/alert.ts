import { ObjectId } from 'mongoose'

export interface AlertI {
  anomalies: string
  tankId: ObjectId
}

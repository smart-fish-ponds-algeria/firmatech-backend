import { ObjectId } from 'mongoose'

export interface ReportI {
  tankId: ObjectId
  content: string
  day: string
}

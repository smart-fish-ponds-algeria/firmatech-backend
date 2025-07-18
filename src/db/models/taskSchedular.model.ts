import { Schema, model, Document } from 'mongoose'
import { taskSchedulerI } from '../../types/taskSchedular.type'

interface taskSchedulerD extends Document, taskSchedulerI {}

const taskSchedularSchema = new Schema<taskSchedulerD>({
  name: { type: String, required: true },
  isRunning: { type: Boolean, required: false, default: false },
})

export const taskSchedularModel = model<taskSchedulerD>('taskSchedular', taskSchedularSchema)

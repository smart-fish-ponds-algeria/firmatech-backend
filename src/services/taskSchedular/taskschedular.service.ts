import { HttpCodes } from '../../config/Errors'
import { formatString } from '../../utils/Strings'
import { ErrorResponseC } from '../services.response'
import { taskSchedularModel } from '../../db/models/taskSchedular.model'
import taskschdularLogs, { taskschdularLogger, TaskschdularLogsI } from './taskschdular.logs'
export class TaskSchedularService {
  static async getOrCreate(name: string) {
    try {
      const task = await taskSchedularModel.findOne({
        name,
      })
      const resp: ICode<TaskschdularLogsI> = taskschdularLogs.TASK_GET_SUCCESS
      taskschdularLogger.info(resp.message, { type: resp.type })
      if (task) {
        return task
      }
      const newTask = new taskSchedularModel({ name })
      await newTask.save()
      console.log('newTask', newTask)

      return newTask
    } catch (err) {
      const msg = formatString(taskschdularLogs.TASK_GET_ERROR.message, {
        error: (err as Error)?.message || '',
      })
      taskschdularLogger.error(msg, err as Error)
      return new ErrorResponseC(
        taskschdularLogs.TASK_GET_ERROR.type,
        HttpCodes.InternalServerError.code,
        msg
      )
    }
  }
}

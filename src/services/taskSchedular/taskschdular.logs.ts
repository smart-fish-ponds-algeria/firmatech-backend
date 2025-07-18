import Logger from '../../utils/Logger'
export type TaskschdularLogsI =
  | 'TASK_CREATE_SUCCESS'
  | 'TASK_CREATE_ERROR'
  | 'TASK_GET_SUCCESS'
  | 'TASK_GET_ERROR'
let i = 0
export const taskschdularLogs: IErrors<TaskschdularLogsI> = {
  TASK_CREATE_SUCCESS: {
    code: i,
    message: 'task created successfully.',
    type: 'TASK_CREATE_SUCCESS',
  },
  TASK_CREATE_ERROR: {
    code: i++,
    message: 'error while creating task {err}',
    type: 'TASK_CREATE_ERROR',
  },
  TASK_GET_SUCCESS: {
    code: i++,
    message: 'task fetched succefully',
    type: 'TASK_GET_SUCCESS',
  },
  TASK_GET_ERROR: {
    code: i++,
    message: 'error while fetching  task {err}',
    type: 'TASK_GET_ERROR',
  },
} as const

export default taskschdularLogs
export const taskschdularLogger = new Logger('taskschdular')

import Logger from '../../utils/Logger'
export type IFireBaseLogs = 'GET_CUSTOMER_SUCCESS'

export const fireBaseLogs: IErrors<IFireBaseLogs> = {
  GET_CUSTOMER_SUCCESS: {
    code: 0,
    message: 'customer with "{id}" fetched successfully.',
    type: 'GET_CUSTOMER_SUCCESS',
  },
} as const

export default fireBaseLogs
export const fireBaseLogger = new Logger('fireBase')

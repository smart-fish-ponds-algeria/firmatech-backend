import Logger from '../../utils/Logger'
export type ISseLogs =
  | 'SSE_STREAM_SUCCESS'
  | 'SSE_ERROR_GENERIC'
  | 'SSE_CLOSED_SUCCESS'
  | 'SSE_ORDER_NOT_FOUND'
  | 'SSE_CONNECTION_LOST'
  | 'SSE_ORDERS_SUCCESS'

export const sseLogs: IErrors<ISseLogs> = {
  SSE_ORDERS_SUCCESS: {
    code: 0,
    message: 'ORDERS store with id "{storeid}" streamed  successfully.',
    type: 'SSE_ORDERS_SUCCESS',
  },
  SSE_CLOSED_SUCCESS: {
    code: 1,
    message: 'SSE closed successfully.',
    type: 'SSE_CLOSED_SUCCESS',
  },
  SSE_STREAM_SUCCESS: {
    code: 1,
    message: 'streaming...',
    type: 'SSE_STREAM_SUCCESS',
  },
  SSE_CONNECTION_LOST: {
    code: 10,
    message: 'SSE CONNECTION LOST :  : {error}',
    type: 'SSE_CONNECTION_LOST',
  },
  SSE_ERROR_GENERIC: {
    code: 11,
    message: 'SSE ERROR : {error}',
    type: 'SSE_ERROR_GENERIC',
  },
  SSE_ORDER_NOT_FOUND: {
    code: 11,
    message: 'SSE Order client not found clientId: {clientId} ',
    type: 'SSE_ORDER_NOT_FOUND',
  },
} as const

export default sseLogs
export const sseLogger = new Logger('sse')

import { ObjectId } from 'mongoose'
import { HttpCodes } from '../../config/Errors'
import { UserModel } from '../../db/models/user/user.model'
import { formatString } from '../../utils/Strings'
import { ErrorResponseC, SuccessResponseC, throwLocalizedErrorResponse } from '../services.response'
import userLogs, { IUserLogs, userLogger } from './user.logs'
import bcrypt from 'bcrypt'
import { formatErrString } from '../../utils/shared/FormatErrStrings'
import { TankMeasurementsModel } from '../../db/models/TankMeasurements/TankMeasurementsI.model'
import { TankMeasurementsI } from '../../types/tankMeasurements'
export class TankMeasurementServices {
  static async getTankMeasuremnt(tankId: ObjectId) {
    try {
      const tankMeasurements = await TankMeasurementsModel.find({ tankId: tankId })
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, tankMeasurements)
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, tankMeasurements, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async createTankMeasuremnt(measurement: TankMeasurementsI) {
    try {
      const tankMeasurement = new TankMeasurementsModel(measurement)
      await tankMeasurement.save()
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, tankMeasurement)
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, tankMeasurement, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
}

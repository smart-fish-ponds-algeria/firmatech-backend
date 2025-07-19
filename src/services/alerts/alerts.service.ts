import { ObjectId } from 'mongoose'
import { HttpCodes } from '../../config/Errors'
import { formatString } from '../../utils/Strings'
import { SuccessResponseC, throwLocalizedErrorResponse } from '../services.response'
import { TankMeasurementsModel } from '../../db/models/TankMeasurements/TankMeasurementsI.model'
import userLogs, { IUserLogs, userLogger } from '../user/user.logs'
import { AlertI } from '../../types/alert'
import { AlertModel } from '../../db/models/alerts/alert.model'
export class AlertServices {
  static async createAlert(alert: AlertI) {
    try {
      const newAlert = new AlertModel(alert)
      await newAlert.save()

      return new SuccessResponseC(
        'Alert Created Successfully',
        newAlert,
        'msg',
        HttpCodes.Accepted.code
      )
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
}

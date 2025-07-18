import { Response } from 'express'
import { UserD } from '../db/models/user/user.model'
import { catchErrorResponse } from '../utils/Response'
import { MyRequest } from '../types/Express'
import authLogs from '../services/auth/auth.logs'
import { TankMeasurementServices } from '../services/tankMeasuremts/measurement.service'
import { TankMeasurementsI } from '../types/tankMeasurements'
import { handleResponseConversion } from '../utils/handleResponseConversion'

export class TankMeasurementController {
  public static async createMeasurement(req: MyRequest<UserD>, res: Response) {
    try {
      const measurement = req.body as TankMeasurementsI
      console.log('body is :', measurement)
      const result = await TankMeasurementServices.createTankMeasuremnt(measurement)
      return handleResponseConversion(res, result)
    } catch (err) {
      const resp = authLogs.LOGIN_ERROR_GENERIC
      catchErrorResponse(err, res, resp)
    }
  }
}

import { Request, Response } from 'express'
import { UserD } from '../db/models/user/user.model'
import { catchErrorResponse } from '../utils/Response'
import { MyRequest } from '../types/Express'
import authLogs from '../services/auth/auth.logs'
import { TankMeasurementServices } from '../services/tankMeasuremts/measurement.service'
import { TankMeasurementsI } from '../types/tankMeasurements'
import { handleResponseConversion } from '../utils/handleResponseConversion'
import { convertToObjectId } from '../utils/convertStringsToObjectId'

export class TankMeasurementController {
  static async createMeasurement(req: Request, res: Response) {
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
  static async getTankMeasuremnt(req: Request, res: Response) {
    try {
      const { measurementId } = req.params
      const measurementIdObj = convertToObjectId(measurementId)
      const result = await TankMeasurementServices.getTankMeasuremnt(measurementIdObj)
      return handleResponseConversion(res, result)
    } catch (err) {
      const resp = authLogs.LOGIN_ERROR_GENERIC
      catchErrorResponse(err, res, resp)
    }
  }
  static async getAllTankMeasuremnts(req: Request, res: Response) {
    try {
      const { tankId } = req.params
      const tankIdObj = convertToObjectId(tankId)
      const result = await TankMeasurementServices.getAllTankMeasuremnts(tankIdObj)
      return handleResponseConversion(res, result)
    } catch (err) {
      const resp = authLogs.LOGIN_ERROR_GENERIC
      catchErrorResponse(err, res, resp)
    }
  }
}

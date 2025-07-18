import { Request, Response } from 'express'
import { catchErrorResponse } from '../utils/Response'
import authLogs from '../services/auth/auth.logs'
import { TankMeasurementServices } from '../services/tankMeasuremts/measurement.service'
import { TankMeasurementsI } from '../types/tankMeasurements'
import { handleResponseConversion } from '../utils/handleResponseConversion'
import { convertToObjectId } from '../utils/convertStringsToObjectId'
import { ReportI } from '../types/report'

export class TankMeasurementController {
  static async createReport(req: Request, res: Response) {
    try {
      const report = req.body as ReportI
      console.log('body is :', report)
      const result = await TankMeasurementServices.createTankMeasuremnt(report as unknown as any)
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

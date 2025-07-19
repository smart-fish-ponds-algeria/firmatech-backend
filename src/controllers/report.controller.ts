import { Request, Response } from 'express'
import { catchErrorResponse } from '../utils/Response'
import { TankMeasurementServices } from '../services/tankMeasuremts/measurement.service'
import { handleResponseConversion } from '../utils/handleResponseConversion'
import { ReportI } from '../types/report'

// TODO: FIX THIS
export class ReportController {
  static async createReport(req: Request, res: Response) {
    try {
      const report = req.body as ReportI
      console.log('body is :', report)
      const result = await TankMeasurementServices.createTankMeasuremnt(report as unknown as any)
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
    }
  }
}

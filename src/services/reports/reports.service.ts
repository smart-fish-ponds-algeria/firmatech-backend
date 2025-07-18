import { ObjectId } from 'mongoose'
import { HttpCodes } from '../../config/Errors'
import { formatString } from '../../utils/Strings'
import { SuccessResponseC, throwLocalizedErrorResponse } from '../services.response'
import { TankMeasurementsModel } from '../../db/models/TankMeasurements/TankMeasurementsI.model'
import { ReportI } from '../../types/report'
import { ReportModel } from '../../db/models/reports/report.model'
import userLogs, { IUserLogs, userLogger } from '../user/user.logs'
export class ReportServices {
  static async getAllReports(tankId: ObjectId) {
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
  static async createReport(report: ReportI) {
    try {
      const newReport = new ReportModel(report)
      await newReport.save()
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, newReport)
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, newReport, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
}

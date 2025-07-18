import { ObjectId } from 'mongoose'
import { HttpCodes } from '../../config/Errors'
import { formatString } from '../../utils/Strings'
import { SuccessResponseC, throwLocalizedErrorResponse } from '../services.response'
import { TankMeasurementsModel } from '../../db/models/TankMeasurements/TankMeasurementsI.model'
import { FeedI } from '../../types/feed'
import { FeedModel } from '../../db/models/feedTime/feed.model'
import userLogs, { IUserLogs, userLogger } from '../user/user.logs'
export class FeedServices {
  static async getAllTankFeeds(tankId: ObjectId) {
    try {
      const tankMeasurements = await FeedModel.find({ tankId: tankId })
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
  static async getLatestTankMeasuremnt(tankId: ObjectId) {
    try {
      const tankMeasurement = await TankMeasurementsModel.findOne({
        tankId: tankId,
      }).sort({ createdAt: -1 })
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      return new SuccessResponseC(resp.type, tankMeasurement, 'msg', HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async createFeed(feed: FeedI) {
    try {
      const newfeed = new FeedModel(feed)
      await newfeed.save()
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, newfeed)
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, newfeed, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async getTankMeasuremnt(measureId: ObjectId) {
    try {
      const waterTank = await TankMeasurementsModel.find({ _id: measureId })
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, waterTank)
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, waterTank, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async getAllDayTankMeasuremnts(tankId: ObjectId) {
    try {
      const startOfDay = new Date()
      startOfDay.setHours(0, 0, 0, 0)
      const endTime = new Date()
      endTime.setHours(23, 35, 0, 0)

      const tankMeasurements = await TankMeasurementsModel.find({
        tankId: tankId,
        timestamp: {
          $gte: startOfDay,
          $lt: endTime,
        },
      })

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
}

import { Request, Response } from 'express'
import { catchErrorResponse } from '../utils/Response'
import authLogs from '../services/auth/auth.logs'
import { TankMeasurementServices } from '../services/tankMeasuremts/measurement.service'
import { handleResponseConversion } from '../utils/handleResponseConversion'
import { convertToObjectId } from '../utils/convertStringsToObjectId'
import { FeedI } from '../types/feed'
import { FeedServices } from '../services/feed/feed.service'

export class FeedController {
  static async createFeed(req: Request, res: Response) {
    try {
      const feed = req.body as FeedI
      console.log('body is :', feed)
      const result = await FeedServices.createFeed(feed)
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
    }
  }
  static async getAllTankFeeds(req: Request, res: Response) {
    try {
      const { tankId } = req.params
      const tankIdObj = convertToObjectId(tankId)
      const result = await FeedServices.getAllTankFeeds(tankIdObj)
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
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

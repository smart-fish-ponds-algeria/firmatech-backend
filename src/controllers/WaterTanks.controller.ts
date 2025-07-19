import { Request, Response } from 'express'
import { catchErrorResponse } from '../utils/Response'
import { handleResponseConversion } from '../utils/handleResponseConversion'
import { WaterTankI } from '../types/waterTank'
import { WaterTankServices } from '../services/waterTanks/waterTank.service'
import { convertToObjectId } from '../utils/convertStringsToObjectId'

export class WaterTankController {
  static async createTanks(req: Request, res: Response) {
    try {
      const waterTank = req.body as WaterTankI
      console.log('body is :', waterTank)
      const result = await WaterTankServices.createWaterTank(waterTank)
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
    }
  }
  static async getWaterTank(req: Request, res: Response) {
    try {
      const { tankId } = req.params
      const tankIdObj = convertToObjectId(tankId)
      const result = await WaterTankServices.getWaterTank(tankIdObj)
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
    }
  }
  static async getAllWaterTanks(req: Request, res: Response) {
    try {
      const result = await WaterTankServices.getAllWaterTanks()
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
    }
  }
  static async getUserWaterTanks(req: Request, res: Response) {
    try {
      const { userId } = req.params
      const userIdObj = convertToObjectId(userId)
      const result = await WaterTankServices.getUserWaterTanks(userIdObj)
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
    }
  }
  static async getWaterTanksByStat(req: Request, res: Response) {
    try {
      const result = await WaterTankServices.getActiveWaterTanks()
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
    }
  }
  static async deleteWaterTank(req: Request, res: Response) {
    try {
      const { tankId } = req.params
      const tankIdObj = convertToObjectId(tankId)
      const result = await WaterTankServices.deleteWaterTank(tankIdObj)
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
    }
  }

  static async updateWaterTankFishDetails(req: Request, res: Response) {
    try {
      const { tankId } = req.params
      console.log(' req.body  :', req.body)

      const { weight, isSick } = req.body
      const tankIdObj = convertToObjectId(tankId)
      const result = await WaterTankServices.updateWaterTankFishDetails(tankIdObj, weight, isSick)
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
    }
  }
}

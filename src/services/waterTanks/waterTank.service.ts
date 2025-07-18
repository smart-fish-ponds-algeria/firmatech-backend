import { ObjectId } from 'mongoose'
import { HttpCodes } from '../../config/Errors'
import { formatString } from '../../utils/Strings'
import { SuccessResponseC, throwLocalizedErrorResponse } from '../services.response'
import userLogs, { IUserLogs, userLogger } from './user.logs'
import { WaterTankModel } from '../../db/models/waterTank/waterTank.model'
import { WaterTankI } from '../../types/waterTank'
export class WaterTankServices {
  static async getWaterTank(tankId: ObjectId) {
    try {
      const waterTank = await WaterTankModel.find({ _id: tankId })
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
  static async getAllWaterTanks() {
    try {
      const waterTanks = await WaterTankModel.find()
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, waterTanks)
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, waterTanks, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async getUserWaterTanks(userId: ObjectId) {
    try {
      const userWaterTanks = await WaterTankModel.find({ responsible: userId })
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, userWaterTanks)
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, userWaterTanks, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async getActiveWaterTanks() {
    try {
      const waterTanks = await WaterTankModel.find({ isActive: true })
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, waterTanks)
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, waterTanks, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async createWaterTank(waterTank: WaterTankI) {
    try {
      waterTank.fishDetails = {
        // for now
        fish_lenght: 0,
        fish_weight: 0,
        total_fish_count: 0,
        total_fish_sick: 0,
      }
      const newWaterTank = new WaterTankModel(waterTank)
      await newWaterTank.save()
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, newWaterTank)
      userLogger.info(msg, { type: resp.type })
      return new SuccessResponseC(resp.type, newWaterTank, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
}

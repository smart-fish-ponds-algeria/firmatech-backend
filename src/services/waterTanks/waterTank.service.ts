import { ObjectId } from 'mongoose'
import { HttpCodes } from '../../config/Errors'
import { formatString } from '../../utils/Strings'
import { ErrorResponseC, SuccessResponseC, throwLocalizedErrorResponse } from '../services.response'
import { WaterTankModel } from '../../db/models/waterTank/waterTank.model'
import { WaterTankI } from '../../types/waterTank'
import { TankMeasurementsI } from '../../types/tankMeasurements'
import { TankMeasurementServices } from '../tankMeasuremts/measurement.service'
import userLogs, { IUserLogs, userLogger } from '../user/user.logs'
import { FeedServices } from '../feed/feed.service'
export class WaterTankServices {
  static async getWaterTank(tankId: ObjectId) {
    try {
      const waterTank = await WaterTankModel.find({ _id: tankId })

      return new SuccessResponseC(
        'Success',
        waterTank,
        'Got water Tank success',
        HttpCodes.Accepted.code
      )
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
      return new SuccessResponseC(resp.type, newWaterTank, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
  static async getAllWaterTanksMeasures() {
    const waterTanksResult = await WaterTankServices.getAllWaterTanks()
    if (waterTanksResult instanceof ErrorResponseC) throw waterTanksResult
    const waterTanks = waterTanksResult.data as WaterTankI[]
    let waterTanksMeasures: {
      tank: WaterTankI
      measures: TankMeasurementsI[]
      number_of_consumed_food: number
    }[] = []
    for (let index = 0; index < waterTanks.length; index++) {
      const result = await TankMeasurementServices.getAllDayTankMeasuremnts(
        waterTanks[index]?._id as any
      )
      const foodQte = await FeedServices.getAllDayTankFeed(waterTanks[index]?._id as any)
      if (result instanceof SuccessResponseC) {
        waterTanksMeasures.push({
          tank: waterTanks[index],
          measures: result.data as TankMeasurementsI[],
          number_of_consumed_food: foodQte,
        })
      }
    }
    return waterTanksMeasures
  }
  static async deleteWaterTank(tankId: ObjectId) {
    try {
      const waterTank = await WaterTankModel.deleteOne({ _id: tankId })
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, waterTank)
      return new SuccessResponseC(resp.type, waterTank, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }

  // TODO: RYAD: FIX IT SO IT WILL UPDATE IsSick only if it is false and we found sick fish
  static async updateWaterTankFishDetails(
    tankId: ObjectId,
    weight: number,
    IsSick: boolean = false
  ) {
    try {
      let waterTank = await WaterTankModel.findOneAndUpdate({ _id: tankId })
      if (!waterTank) return new ErrorResponseC('Water Tank not Found', 404, 'Water Tank not Found')
      waterTank.hasSick = IsSick
      waterTank.fishDetails = {
        ...waterTank.fishDetails,
        fish_weight: weight,
      }
      await waterTank.save()
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_SUCCESS
      const msg = formatString(resp.message, waterTank)
      return new SuccessResponseC(resp.type, waterTank, msg, HttpCodes.Accepted.code)
    } catch (err) {
      const resp: ICode<IUserLogs> = userLogs.GET_ALL_USER_ERROR_GENERIC
      return throwLocalizedErrorResponse(resp, HttpCodes.InternalServerError.code, userLogger, {
        error: (err as Error).message,
      })
    }
  }
}

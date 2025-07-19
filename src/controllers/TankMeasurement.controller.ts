import { Request, Response } from 'express'
import { catchErrorResponse, SuccessResponse } from '../utils/Response'
import { TankMeasurementServices } from '../services/tankMeasuremts/measurement.service'
import { TankMeasurementsI } from '../types/tankMeasurements'
import { handleResponseConversion } from '../utils/handleResponseConversion'
import { convertToObjectId } from '../utils/convertStringsToObjectId'
import { sendPushNotification } from './createFireBaseNotif'
import { WaterTankServices } from '../services/waterTanks/waterTank.service'
import { SuccessResponseC } from '../services/services.response'
import { UserServices } from '../services/user/user.service'
import { WaterTankI } from '../types/waterTank'
import { UserD } from '../db/models/user/user.model'
import { sendEmailAlertTemplate } from '../emails/alertTemplate/app'

export function detectAnomalies(data: TankMeasurementsI): {
  anomalies: string
  anomaliDetected: boolean
} {
  let issues: string = ''

  let anomaliDetected = false
  if (data.water_level <= 0.5) {
    anomaliDetected = true
    issues = issues + '' + 'Low water level'
  }
  if (data.suspended_solids > 50) {
    anomaliDetected = true
    issues = issues + ',' + 'High suspended solids (turbidity)'
  }
  if (data.salinity < 0.5 || data.salinity > 10) {
    anomaliDetected = true
    issues = issues + ',' + 'Abnormal salinity'
  }
  if (data.pH < 6.5 || data.pH > 8.5) {
    anomaliDetected = true
    issues = issues + ',' + 'Abnormal pH level'
  }
  if (data.nitrite > 0.5) {
    anomaliDetected = true
    issues = issues + ',' + 'High nitrite level'
  }
  if (data.nitrate > 40) {
    anomaliDetected = true
    issues = issues + ',' + 'High nitrate level'
  }
  if (data.ammonia > 0.5) {
    anomaliDetected = true
    issues = issues + ',' + 'High ammonia level'
  }
  if (data.temperature < 20 || data.temperature > 28) {
    anomaliDetected = true
    issues = issues + ',' + 'Abnormal temperature'
  }
  if (data.O2 < 5) {
    anomaliDetected = true
    issues = issues + ',' + 'Low dissolved oxygen'
  }

  return {
    anomaliDetected,
    anomalies: issues,
  }
}
export class TankMeasurementController {
  static async createMeasurement(req: Request, res: Response) {
    try {
      const measurement = req.body as TankMeasurementsI
      const { anomaliDetected, anomalies } = detectAnomalies(measurement)
      if (anomaliDetected) {
        const waterTankResult = await WaterTankServices.getWaterTank(measurement.tankId)
        if (waterTankResult instanceof SuccessResponseC) {
          const waterTank = waterTankResult.data as WaterTankI[]
          const userResult = await UserServices.findUser(waterTank[0].responsible)
          const user = userResult.data as UserD
          sendEmailAlertTemplate(
            user.email,
            user.firstName,
            user.lastName,
            measurement,
            anomalies,
            measurement.tankId.toString().slice(0, 4)
          )

          // TODO: RYAD: IF THERE IS TIME
          // sendPushNotification(user.expoToken!, 'Alert', 'Alert', measurement)
        }
        // sendPushNotification("", "Alert",{
        // })
      }
      console.log('body is :', measurement)
      const result = await TankMeasurementServices.createTankMeasuremnt(measurement)
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
    }
  }
  static async getTankMeasuremnt(req: Request, res: Response) {
    try {
      const { measurementId } = req.params
      const measurementIdObj = convertToObjectId(measurementId)
      const result = await TankMeasurementServices.getTankMeasuremnt(measurementIdObj)
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
      catchErrorResponse(err, res)
    }
  }
  static async getTankLatestMeasuremnts(req: Request, res: Response) {
    try {
      const { tankId } = req.params
      const tankIdObj = convertToObjectId(tankId)
      const result = await TankMeasurementServices.getLatestTankMeasuremnt(tankIdObj)
      return handleResponseConversion(res, result)
    } catch (err) {
      catchErrorResponse(err, res)
    }
  }
}

import axios from 'axios'
import { WaterTankServices } from '../services/waterTanks/waterTank.service'
import { FASTAPI_ENDPOINTS } from '../route.enum'
import { FastApi_BACK_EN_URL } from '../config/EnvProvider'

export async function fetchingMeasureScheduler() {
  try {
    const allWaterTanksMeasures = await WaterTankServices.getAllWaterTanksMeasures()
    console.log('in scheduler')

    await axios.post(`${FastApi_BACK_EN_URL}/${FASTAPI_ENDPOINTS}`, allWaterTanksMeasures)
    return
  } catch (err) {
    const msg = `Error while sending data to servers: ${err}`
    console.error(msg)
    return msg
  }
}

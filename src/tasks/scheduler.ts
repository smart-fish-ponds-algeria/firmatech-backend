import axios from 'axios'
import { WaterTankServices } from '../services/waterTanks/waterTank.service'

export async function fetchingMeasureScheduler() {
  try {
    const allWaterTanksMeasures = await WaterTankServices.getAllWaterTanksMeasures()
    console.log('in scheduler')

    await axios.post('', allWaterTanksMeasures)
    return
  } catch (err) {
    const msg = `Error while sending data to servers: ${err}`
    console.error(msg)
    return msg
  }
}

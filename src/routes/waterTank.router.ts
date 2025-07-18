import { Router } from 'express'
import { WaterTankController } from '../controllers/WaterTanks.controller'

const waterTanksRouter = Router()

waterTanksRouter.route('/').post(WaterTankController.createTanks)
waterTanksRouter.route('/').get(WaterTankController.getAllWaterTanks)
waterTanksRouter.route('/active').get(WaterTankController.getWaterTanksByStat)
waterTanksRouter.route('/user/:userId').get(WaterTankController.getUserWaterTanks)
waterTanksRouter.route('/:tankId').get(WaterTankController.getWaterTank)

export default waterTanksRouter

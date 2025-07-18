import { Router } from 'express'
import { TankMeasurementController } from '../controllers/TankMeasurement.controller'

const measurementsRouter = Router()

measurementsRouter.route('/').post(TankMeasurementController.createMeasurement)
measurementsRouter
  .route('/tankWater/latest/:tankId')
  .get(TankMeasurementController.getTankLatestMeasuremnts)
measurementsRouter.route('/tankWater/:tankId').get(TankMeasurementController.getAllTankMeasuremnts)
measurementsRouter.route('/:measurementId').get(TankMeasurementController.getTankMeasuremnt)

export default measurementsRouter

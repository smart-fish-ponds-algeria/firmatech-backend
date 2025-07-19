import { Router } from 'express'
import { TankMeasurementController } from '../controllers/TankMeasurement.controller'

const measurementsRouter = Router()

/**
 * @swagger
 * /measurements:
 *   post:
 *     summary: Create a new tank measurement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tankId
 *               - timestamp
 *               - water_level
 *               - suspended_solids
 *               - salinity
 *               - pH
 *               - nitrite
 *               - nitrate
 *               - ammonia
 *               - temperature
 *               - O2
 *             properties:
 *               tankId:
 *                 type: string
 *                 description: ID of the tank
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-18T14:30:00.000Z"
 *               water_level:
 *                 type: number
 *                 example: 75.5
 *               suspended_solids:
 *                 type: number
 *                 example: 12.3
 *               salinity:
 *                 type: number
 *                 example: 0.6
 *               pH:
 *                 type: number
 *                 example: 7.4
 *               nitrite:
 *                 type: number
 *                 example: 0.02
 *               nitrate:
 *                 type: number
 *                 example: 0.8
 *               ammonia:
 *                 type: number
 *                 example: 0.1
 *               temperature:
 *                 type: number
 *                 example: 22.5
 *               O2:
 *                 type: number
 *                 description: Dissolved oxygen level
 *                 example: 6.3
 *     responses:
 *       201:
 *         description: Measurement created successfully
 *       400:
 *         description: Invalid input
 */
measurementsRouter.route('/').post(TankMeasurementController.createMeasurement)

/**
 * @swagger
 * /measurements/tankWater/latest/{tankId}:
 *   get:
 *     summary: Get the latest measurement for a specific tank
 *     parameters:
 *       - in: path
 *         name: tankId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tank
 *     responses:
 *       200:
 *         description: Latest measurement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Measurement'
 *       404:
 *         description: No measurements found for the tank
 */

measurementsRouter
  .route('/tankWater/latest/:tankId')
  .get(TankMeasurementController.getTankLatestMeasuremnts)

/**
 * @swagger
 * /measurements/tankWater/{tankId}:
 *   get:
 *     summary: Get all measurements for a specific tank
 *     parameters:
 *       - in: path
 *         name: tankId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tank
 *     responses:
 *       200:
 *         description: List of measurements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Measurement'
 *       404:
 *         description: No measurements found
 */

measurementsRouter.route('/tankWater/:tankId').get(TankMeasurementController.getAllTankMeasuremnts)

/**
 * @swagger
 * /measurements/{measurementId}:
 *   get:
 *     summary: Get a measurement by its ID
 *     parameters:
 *       - in: path
 *         name: measurementId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the measurement
 *     responses:
 *       200:
 *         description: Measurement details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Measurement'
 *       404:
 *         description: Measurement not found
 */

measurementsRouter.route('/:measurementId').get(TankMeasurementController.getTankMeasuremnt)

export default measurementsRouter

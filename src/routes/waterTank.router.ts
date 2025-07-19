import { Router } from 'express'
import { WaterTankController } from '../controllers/WaterTanks.controller'

const waterTanksRouter = Router()

/**
 * @swagger
 * /waterTanks:
 *   post:
 *     summary: Create a new water tank
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - name
 *               - location
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user who owns the tank
 *               name:
 *                 type: string
 *                 example: "Tilapia Tank 1"
 *               location:
 *                 type: string
 *                 example: "North Farm Zone A"
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Water tank created
 *       400:
 *         description: Invalid input
 */

waterTanksRouter.route('/').post(WaterTankController.createTanks)

/**
 * @swagger
 * /waterTanks:
 *   get:
 *     summary: Get all water tanks
 *     responses:
 *       200:
 *         description: List of all water tanks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WaterTank'
 */
waterTanksRouter.route('/').get(WaterTankController.getAllWaterTanks)

/**
 * @swagger
 * /waterTanks/active:
 *   get:
 *     summary: Get all active water tanks
 *     responses:
 *       200:
 *         description: List of active water tanks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WaterTank'
 */
waterTanksRouter.route('/active').get(WaterTankController.getWaterTanksByStat)

/**
 * @swagger
 * /waterTanks/user/{userId}:
 *   get:
 *     summary: Get all water tanks owned by a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of user's water tanks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WaterTank'
 *       404:
 *         description: User not found or no tanks
 */

waterTanksRouter.route('/user/:userId').get(WaterTankController.getUserWaterTanks)
/**
 * @swagger
 * /waterTanks/{tankId}:
 *   get:
 *     summary: Get a specific water tank by ID
 *     parameters:
 *       - in: path
 *         name: tankId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the water tank
 *     responses:
 *       200:
 *         description: Water tank details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WaterTank'
 *       404:
 *         description: Tank not found
 */

waterTanksRouter.route('/:tankId').get(WaterTankController.getWaterTank)
/**
 * @swagger
 * /waterTanks/{tankId}:
 *   put:
 *     summary: Update fish details for a specific water tank
 *     parameters:
 *       - in: path
 *         name: tankId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tank to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - weight
 *               - isSick
 *             properties:
 *               weight:
 *                 type: number
 *                 example: 350.5
 *               isSick:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Tank updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Tank not found
 */

waterTanksRouter.route('/:tankId').put(WaterTankController.updateWaterTankFishDetails)
/**
 * @swagger
 * /waterTanks/{tankId}:
 *   delete:
 *     summary: Delete a water tank by ID
 *     parameters:
 *       - in: path
 *         name: tankId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the water tank
 *     responses:
 *       200:
 *         description: Water tank deleted
 *       404:
 *         description: Tank not found
 */

waterTanksRouter.route('/:tankId').delete(WaterTankController.deleteWaterTank)

export default waterTanksRouter

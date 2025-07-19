import { Router } from 'express'
import { FeedController } from '../controllers/feed.controller'

// TODO: RYAD: Add Endpoint to get by day and such

const feedRouter = Router()

/**
 * @swagger
 * /feed:
 *   post:
 *     summary: Create a new feed entry — this is for the farmer when they feed a water tank
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tankId
 *               - qte
 *             properties:
 *               tankId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               qte:
 *                 type: number
 *                 example: 50.5
 *     responses:
 *       201:
 *         description: Feed created successfully
 *       400:
 *         description: Bad request (missing or invalid tankId or qte)
 */
feedRouter.route('/').post(FeedController.createFeed)

/**
 * @swagger
 * /feed/tankWater/{tankId}:
 *   get:
 *     summary: Get all feed entries for a specific tank
 *     description: Retrieves a list of all feed records where food was added to the given water tank.
 *     parameters:
 *       - in: path
 *         name: tankId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tank
 *     responses:
 *       200:
 *         description: A list of feed entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   feedId:
 *                     type: string
 *                     example: "feed123"
 *                   tankId:
 *                     type: string
 *                     example: "tank456"
 *                   amount:
 *                     type: number
 *                     example: 5.5
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-07-18T12:34:56.000Z"
 *       404:
 *         description: Tank not found or no feed entries available
 */
feedRouter.route('/tankWater/:tankId').get(FeedController.getAllTankFeeds)

export default feedRouter

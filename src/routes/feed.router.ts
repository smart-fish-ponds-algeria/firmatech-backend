import { Router } from 'express'
import { FeedController } from '../controllers/feed.controller'

// TODO: RYAD: Add Endpoint to get by day and such

const feedRouter = Router()

/**
 * @swagger
 * /feed:
 *   post:
 *     summary: Create a new feed entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tankId
 *             properties:
 *               tankId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Feed created successfully
 *       400:
 *         description: Bad request (missing or invalid tankId)
 */
feedRouter.route('/').post(FeedController.createFeed)
feedRouter.route('/tankWater/:tankId').get(FeedController.getAllTankFeeds)

export default feedRouter

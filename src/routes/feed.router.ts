import { Router } from 'express'
import { FeedController } from '../controllers/feed.controller'

// TODO: RYAD: Add Endpoint to get by day and such

const feedRouter = Router()

feedRouter.route('/').post(FeedController.createFeed)
feedRouter.route('/tankWater/:tankId').get(FeedController.getAllTankFeeds)

export default feedRouter

import { Router } from 'express'
import {} from '../controllers/user.controller'
import {} from '../services/user/user.validators'
import { test } from '../controllers/test.controller'

const testRouter = Router()

testRouter.route('/').get(test)
export default testRouter

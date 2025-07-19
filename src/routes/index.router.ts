import { Router, Request, Response } from 'express'

import { UserServices } from '../services/user/user.service'
import { ErrorResponseC } from '../services/services.response'

const indexRouter = Router()
indexRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserServices.getAllUsersAdmin()
    if (users instanceof ErrorResponseC) {
      res.status(500).send('Cannot connect to DB')
      return
    }

    res.send(`
          API IS ONE 
        `)
  } catch (error) {
    console.error('An error occurred:', error)
    res.status(500).send('Internal Server Error')
  }
})
indexRouter.post('/expo', async (req: Request, res: Response) => {
  try {
    const { token } = req.body
    console.log('Token is : ', token)
  } catch (error) {
    console.error('An error occurred:', error)
    res.status(500).send('Internal Server Error')
  }
})

export default indexRouter

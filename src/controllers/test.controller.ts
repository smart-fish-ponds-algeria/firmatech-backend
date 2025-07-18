import { Request, Response } from 'express'
import axios from 'axios'

export const test = async (req: Request, res: Response) => {
  const consumerKey = '-'
  const consumerSecret = '-'

  const url = '-'
  try {
    console.log('test')
    const response = await axios.get(url, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
    })

    res.json(response.data)
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      details: error.response?.data,
    })
  }
}

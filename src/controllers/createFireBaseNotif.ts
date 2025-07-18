import { UserD } from '../db/models/user/user.model'
import { MyRequest } from '../types/Express'
import { Response } from 'express'
import { sendNotifToOneDevice } from '../utils/firebase'
import { fireBaseMessageI } from '../types/firebase'

export class testNotifController {
  static async sendNotifToDevice(req: MyRequest<UserD>, res: Response): Promise<void> {
    const data = req.body
    const user = req.user!
    const fireBaseMessageI: fireBaseMessageI = {
      notification: {
        title: data.title,
        body: data.body,
      },
    }
    const result = await sendNotifToOneDevice(user.fcmTokens[0], fireBaseMessageI)

    if (result) {
      res.status(200).json({ message: 'notif sent', data: result })
    } else {
      res.status(400).json({ message: 'notif not sent' })
    }
  }
}

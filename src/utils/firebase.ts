import admin from '../config/firebase-config'
import { fireBaseMessageI } from '../types/firebase'

export async function sendNotifToOneDevice(registrationToken: string, message: fireBaseMessageI) {
  try {
    const response = await admin.messaging().send({
      token: registrationToken,
      ...message,
    })
    console.log('Successfully sent message:', response)
    return response
  } catch (error) {
    console.error('Error sending message notification:', error)
  }
}

export async function sendNotificationToManyClients(topic: string, message: fireBaseMessageI) {
  try {
    const response = await admin.messaging().send({
      topic: topic,
      ...message,
    })

    console.log('Successfully sent message:', response)
  } catch (error) {
    console.log('Error sending message:', error)
  }
}

export async function sendNotifToMultipleDevices(
  registrationsTokens: string[],
  message: fireBaseMessageI
) {
  try {
    await admin.messaging().sendEachForMulticast({ ...message, tokens: registrationsTokens })
  } catch (err) {
    console.log('Error sending message to multiple:', err)
  }
}

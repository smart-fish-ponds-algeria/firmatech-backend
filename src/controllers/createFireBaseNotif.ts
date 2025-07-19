import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk'

const expo = new Expo()

/**
 * Sends a push notification using Expo Push API
 * @param token - The Expo Push Token (e.g., ExponentPushToken[xxx])
 * @param title - The title of the notification
 * @param body - The body/message of the notification
 * @param data - Optional data payload to include
 * @returns A promise resolving to an object with success status, tickets, or error
 */
export async function sendPushNotification(
  token: string,
  title: string,
  body: string,
  data: Record<string, any> = {}
): Promise<{ success: boolean; tickets?: ExpoPushTicket[]; error?: string }> {
  if (!Expo.isExpoPushToken(token)) {
    return { success: false, error: 'Invalid Expo push token' }
  }

  const message: ExpoPushMessage = {
    to: token,
    sound: 'default' as const,
    title: title || 'Notification',
    body: body || 'This is a push notification',
    data,
  }

  try {
    const chunks = expo.chunkPushNotifications([message])
    const tickets: ExpoPushTicket[] = []

    for (const chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
      tickets.push(...ticketChunk)
    }

    return { success: true, tickets }
  } catch (error: any) {
    console.error('Error sending push notification:', error)
    return { success: false, error: error.message }
  }
}

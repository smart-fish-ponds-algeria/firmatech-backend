import { fireBaseMessageI } from '../../types/firebase'
import { sendNotifToMultipleDevices } from '../firebase'

export async function sendingNotifToAllPlatformsWithTranslition(
  proccessNotifs: any,
  notif: any
) {
  if (proccessNotifs.concernedFcmTokens.length > 0) {
    const fireBaseMessageI: fireBaseMessageI = {
      notification: {
        title: notif.title,
        body: notif.message,
      },
    }
    await sendNotifToMultipleDevices(proccessNotifs.concernedFcmTokens, fireBaseMessageI)
  }
  if (proccessNotifs.concernedFcmTokensAr.length > 0) {
    const fireBaseMessageI: fireBaseMessageI = {
      notification: {
        title: notif?.translition?.titleAr || notif.title,
        body: notif?.translition?.messageAr || notif.message,
      },
    }
    await sendNotifToMultipleDevices(proccessNotifs.concernedFcmTokensAr, fireBaseMessageI)
  }

  if (proccessNotifs.concernedFcmTokensFr.length > 0) {
    const fireBaseMessageI: fireBaseMessageI = {
      notification: {
        title: notif?.translition?.titleFr || notif.title,
        body: notif?.translition?.messageFr || notif.message,
      },
    }
    await sendNotifToMultipleDevices(proccessNotifs.concernedFcmTokens, fireBaseMessageI)
  }
}

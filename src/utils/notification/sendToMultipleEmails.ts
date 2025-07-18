import { FRONT_URL } from '../../config/EnvProvider'
// import { NotificationD } from '../../db/models/notification/notification.model'
// import {
//   sendDefaultNotifTemplate,
//   sendNotifOnNeworderTemplate,
//   sendNotifOnOrderStalledTemplate,
//   sendNotifOnOrderStatusUpdatedTemplate,
// } from '../../emails'
// import { processUserNotificationsI } from './notifications.utils'

export async function sendingNotifToAllemailsWithTranslition(
  proccessNotifs: any,
  notif: any
) {
  const defaultLink = `${FRONT_URL}`
  if (proccessNotifs.concernedArEmails.length > 0) {
    // await sendDefaultNotifTemplate({
    //   lang: 'ar',
    //   receiverEmails: proccessNotifs.concernedArEmails,
    //   subject: notif.translition?.titleAr || notif.title,
    //   title: notif.translition?.titleAr || notif.title,
    //   description: notif.translition?.messageAr || notif.message,
    //   link: notif?.link || defaultLink,
    // })
    console.log("send email",defaultLink,notif)
  }
}

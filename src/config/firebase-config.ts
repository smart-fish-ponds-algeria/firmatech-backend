import * as admin from 'firebase-admin'
import { FIREBASE_EMAIL, FIREBASE_PRIVATEKEY, FIREBASE_PROJECT_ID } from './EnvProvider'

const serviceAccount = {
  clientEmail: FIREBASE_EMAIL,
  project_id: FIREBASE_PROJECT_ID,
  privateKey: FIREBASE_PRIVATEKEY,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export default admin

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import firebaseConfig from './config'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export { auth, db, provider }
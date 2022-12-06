import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'CHANGE_ME',
	authDomain: 'CHANGE_ME',
	projectId: 'CHANGE_ME',
	storageBucket: 'CHANGE_ME',
	messagingSenderId: 'CHANGE_ME',
	appId: 'CHANGE_ME',
	measurementId: 'CHANGE_ME'
}

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export {
	db, storage
}
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebase.json'

// Optionally import the services that you want to use
//import 'firebase/auth'
//import 'firebase/database'
import 'firebase/firestore'
//import 'firebase/functions'
import 'firebase/storage'

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export const storage = firebase.storage()

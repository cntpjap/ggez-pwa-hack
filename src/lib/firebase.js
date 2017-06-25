import * as firebase from 'firebase'
import markerModel from './models/marker'

let database

export const init = () => {
  let config = {
    apiKey: "AIzaSyA97MczftMBhL_LIvONRQ7GumLJch6rUyA",
    authDomain: "ggez-pwa-hack.firebaseapp.com",
    databaseURL: "https://ggez-pwa-hack.firebaseio.com",
    projectId: "ggez-pwa-hack",
    storageBucket: "ggez-pwa-hack.appspot.com",
    messagingSenderId: "474981516628"
  }
  firebase.initializeApp(config)
  database = firebase.database()
}

export const fetchMarkers = () => {
  return database.ref('/').once('value')
}

export const fetchMarker = (key) => {
  return database.ref('/'+key).once('value')
}

export const addMarker = (name, position, upvote, downvote, comment) => {
  let key = database.ref('/').push().key
  let model = markerModel(key, name, position, upvote, downvote, comment)
  return database.ref('/'+ key).set(model)
}

export const updateMarker = (key, name, position, upvote, downvote, comment) => {
  let model = markerModel(key, name, position, upvote, downvote, comment)
  return database.ref('/'+ key).set(model)
}
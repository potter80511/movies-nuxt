import firebase from 'firebase/app';
// import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDitZDXRiRvRKcG8HoUzD9x7bX2t27FOME",
  authDomain: "movies-a4f0a.firebaseapp.com",
  databaseURL: "https://movies-a4f0a.firebaseio.com",
  projectId: "movies-a4f0a",
  storageBucket: "movies-a4f0a.appspot.com",
  messagingSenderId: "484227755008",
  appId: "1:484227755008:web:8b61199284732b3d5efce5"
};

// Initialize Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
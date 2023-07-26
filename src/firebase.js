import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBoL2cdExvvFfhQgOuEWXbKgYHczLTDAKM",
  authDomain: "ecommerce-5a4ea.firebaseapp.com",
  //databaseURL: "https://ecommerce-5a4ea.firebaseio.com",
  projectId: "ecommerce-5a4ea",
  storageBucket: "ecommerce-5a4ea.appspot.com",
  messagingSenderId: "895770234372",
  appId: "1:895770234372:web:b5df5722ebdce7f1046f51"
};


const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
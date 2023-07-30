import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD7WwrPUJHPFOgB1MMZsu6NLYkgM1MLDug",
  authDomain: "ecommerce-84d73.firebaseapp.com",
   //databaseURL: "https://ecommerce-84d73.firebaseio.com",
  projectId: "ecommerce-84d73",
  storageBucket: "ecommerce-84d73.appspot.com",
  messagingSenderId: "722745819940",
  appId: "1:722745819940:web:7741d11f8ee26cdfd629b1"
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
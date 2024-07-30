// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB4aYfGieL7IHm87kF-cHkAXG6A8eo1Hg",
  authDomain: "vite-contact-a3215.firebaseapp.com",
  projectId: "vite-contact-a3215",
  storageBucket: "vite-contact-a3215.appspot.com",
  messagingSenderId: "391515758492",
  appId: "1:391515758492:web:2517f9e152797e7a543259"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//reference of app passed in getFirestore
export const db=getFirestore(app);

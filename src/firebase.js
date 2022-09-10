// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4rPNY5M0iRTgspMtj-ADeM4AVinHuBmQ",
  authDomain: "video-de9f5.firebaseapp.com",
  projectId: "video-de9f5",
  storageBucket: "video-de9f5.appspot.com",
  messagingSenderId: "227397459579",
  appId: "1:227397459579:web:b5e3e970ca012fcafc0cde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const provider=new GoogleAuthProvider();
export default app;
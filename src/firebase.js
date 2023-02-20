import { initializeApp } from "firebase/app";

const firebaseConfig = {
  projectId: "video-de9f5",
  messagingSenderId: "227397459579",
  apiKey: "AIzaSyC4rPNY5M0iRTgspMtj-ADeM4AVinHuBmQ",
  authDomain: "video-de9f5.firebaseapp.com",
  storageBucket: "video-de9f5.appspot.com",
  appId: "1:227397459579:web:b5e3e970ca012fcafc0cde"
};

const app = initializeApp(firebaseConfig);
export default app;
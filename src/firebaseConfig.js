// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJ0Om_GyOwpAgJoaQc7g1oplyGx7g70LQ",
  authDomain: "auth-backend-tu-nombre.firebaseapp.com",
  projectId: "auth-backend-tu-nombre",
  storageBucket: "auth-backend-tu-nombre.appspot.com",
  messagingSenderId: "370925550099",
  appId: "1:370925550099:web:ebfdea93f12c7b01435de6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
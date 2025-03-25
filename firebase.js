// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7exoNc0rCW4YnafTcTDieh37DAeWU_fw",
  authDomain: "yhealth-fe421.firebaseapp.com",
  projectId: "yhealth-fe421",
  storageBucket: "yhealth-fe421.firebasestorage.app",
  messagingSenderId: "840786536270",
  appId: "1:840786536270:web:f6cef85ca994fe62b2201f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

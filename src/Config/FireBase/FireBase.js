import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOCZoESKux3nvbXqKT8q2fkFYqBkg6Qcw",
  authDomain: "todousingreactbymrhaji.firebaseapp.com",
  projectId: "todousingreactbymrhaji",
  storageBucket: "todousingreactbymrhaji.appspot.com",
  messagingSenderId: "7599731781",
  appId: "1:7599731781:web:5aefa2fafa3a2f7bf95f2c",
  measurementId: "G-3YVRLBBM4J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const AUTH = getAuth(app);
const DB = getFirestore(app);
export { DB, AUTH };

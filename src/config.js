import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Import Firestore correctly

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAniaHtMoIoawLFwTXNArcwz-TwstAsj54",
  authDomain: "react-23808.firebaseapp.com",
  projectId: "react-23808",
  storageBucket: "react-23808.appspot.com",
  messagingSenderId: "570274286494",
  appId: "1:570274286494:web:f2b9839626124cae65a48f",
  measurementId: "G-FXEXL1M3HX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage and Auth
export const storage = getStorage(app);
export const auth = getAuth(app);

// Initialize Firestore and export it as db
export const db = getFirestore(app);  // Correct Firestore initialization

// Exporting storage, auth, ref, and uploadBytes as needed
export { ref, uploadBytes };

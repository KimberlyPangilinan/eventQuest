// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signInWithCustomToken } from 'firebase/auth';
import {getStorage} from 'firebase/storage'
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsKfxvGzpm76gqI9hSaJgXrJ36Q5LDHuE",
  authDomain: "eventquest-8eb15.firebaseapp.com",
  projectId: "eventquest-8eb15",
  storageBucket: "eventquest-8eb15.appspot.com",
  messagingSenderId: "904503743793",
  appId: "1:904503743793:web:7ae91739f299ebf3adcc10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);


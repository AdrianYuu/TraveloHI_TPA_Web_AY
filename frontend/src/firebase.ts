// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHbiIF_qOjboBiTD0PZ9QILCczbe2oVOk",
  authDomain: "travelohi-89d78.firebaseapp.com",
  projectId: "travelohi-89d78",
  storageBucket: "travelohi-89d78.appspot.com",
  messagingSenderId: "21026430903",
  appId: "1:21026430903:web:4fc8ad1a2917edfbb65232",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

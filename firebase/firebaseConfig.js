// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMm6xdoJ0XPPMzP5e2pCLYTAz9MeL9YV8",
  authDomain: "moviemobile-8a69c.firebaseapp.com",
  projectId: "moviemobile-8a69c",
  storageBucket: "moviemobile-8a69c.appspot.com",
  messagingSenderId: "347489919700",
  appId: "1:347489919700:web:becc879aeafe15aba71141"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

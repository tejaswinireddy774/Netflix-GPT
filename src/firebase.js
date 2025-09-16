// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6fpcUyyNEvC6qatxisfotoH09_-gm6G4",
  authDomain: "netflix-gpt-13289.firebaseapp.com",
  projectId: "netflix-gpt-13289",
  messagingSenderId: "167882312320",
  appId: "1:167882312320:web:63b41ab4d505784a823465",
  measurementId: "G-HXPZ0MV2DB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
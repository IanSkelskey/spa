// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDPWFmyEj1O9WfxJn-f8i2dZUypg1md08",
  authDomain: "the-spa-84a52.firebaseapp.com",
  projectId: "the-spa-84a52",
  storageBucket: "the-spa-84a52.firebasestorage.app",
  messagingSenderId: "992798587892",
  appId: "1:992798587892:web:52000467409895d96dd7a1",
  measurementId: "G-KX78TPKPC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
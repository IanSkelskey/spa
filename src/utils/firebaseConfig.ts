// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
	apiKey: "AIzaSyDDPWFmyEj1O9WfxJn-f8i2dZUypg1md08",
	authDomain: "the-spa-84a52.firebaseapp.com",
	projectId: "the-spa-84a52",
	storageBucket: "the-spa-84a52.firebasestorage.app",
	messagingSenderId: "992798587892",
	appId: "1:992798587892:web:52000467409895d96dd7a1",
	measurementId: "G-KX78TPKPC8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
getAnalytics(app);

export { app, functions };

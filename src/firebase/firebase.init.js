// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFv5TGuSgqiNMsHmI0mqIGkUQ0qBDmEDM",
  authDomain: "shop-adidas.firebaseapp.com",
  projectId: "shop-adidas",
  storageBucket: "shop-adidas.appspot.com",
  messagingSenderId: "178339055643",
  appId: "1:178339055643:web:6435d9f36b6d6ffab3d0be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH6VMYtDqQwP6wwITnbjS7N4ZLGOhFaWk",
  authDomain: "ecommerceplatform-a9456.firebaseapp.com",
  projectId: "ecommerceplatform-a9456",
  storageBucket: "ecommerceplatform-a9456.appspot.com",
  messagingSenderId: "1025199854400",
  appId: "1:1025199854400:web:75ba31d0f0fa62109ee0a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider
} from "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyByHcc3wQqoA4LLJ-pWHFr_abemIy7GgZc",
  authDomain: "ecommerce-master-86e52.firebaseapp.com",
  projectId: "ecommerce-master-86e52",
  storageBucket: "ecommerce-master-86e52.appspot.com",
  messagingSenderId: "798741227506",
  appId: "1:798741227506:web:c43cf9b7c04981b2f7ad6b"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const providerGoogle = new GoogleAuthProvider()
export const providerFacebook = new FacebookAuthProvider()
export const providerGithub = new GithubAuthProvider()
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDPwGg2qHd36WDhSRvEopxqxsAbsbjTF4I",
  authDomain: "bububfinancee.firebaseapp.com",
  projectId: "bububfinancee",
  storageBucket: "bububfinancee.firebasestorage.app",
  messagingSenderId: "942488000958",
  appId: "1:942488000958:web:15a74122d79801bd9981ef",
  measurementId: "G-94B3HFVZYY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
};
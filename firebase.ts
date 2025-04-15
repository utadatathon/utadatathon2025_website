// firebase/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, where, getDocs, serverTimestamp, query  } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";

// Replace these with your Firebase project config values.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  app, 
  db, 
  storage, 
  auth, 
  provider,
  ref, 
  uploadBytes, 
  getDownloadURL,
  collection,
  addDoc,
  where,    
  getDocs,
  serverTimestamp,
  query,
  signOut
};

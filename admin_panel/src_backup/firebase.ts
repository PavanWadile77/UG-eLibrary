import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "ug-elibrary"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ug-elibrary",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ug-elibrary.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

let appInstance: any;
let authInstance: any;
let dbInstance: any;
let storageInstance: any;
let isDemo = false;

if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("your_firebase_key")) {
  isDemo = true;
  console.warn("Firebase configuration credentials not set. Bootstrapping Admin Console in Demo Mode.");
} else {
  try {
    appInstance = initializeApp(firebaseConfig);
    authInstance = getAuth(appInstance);
    dbInstance = getFirestore(appInstance);
    storageInstance = getStorage(appInstance);
  } catch (e) {
    console.error("Firebase initialization failed:", e);
    isDemo = true;
  }
}

export const isFirebaseDemo = isDemo;
export const auth = authInstance;
export const db = dbInstance;
export const storage = storageInstance;
export default appInstance;

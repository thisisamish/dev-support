import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF_xggWto9pbHJzThUMsZx0SmBXLTkFMo",
  authDomain: "dev-support-64f1e.firebaseapp.com",
  projectId: "dev-support-64f1e",
  storageBucket: "dev-support-64f1e.appspot.com",
  messagingSenderId: "489006595134",
  appId: "1:489006595134:web:4daca1b38379d1d1b4e56f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

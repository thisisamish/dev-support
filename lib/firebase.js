import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
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

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const logOut = async () => {
  await signOut(auth);
};

export const db = getFirestore(app);
export const storage = getStorage(app);

export async function getUserWithUsername(username) {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username), limit(1));
    const userDoc = (await getDocs(q)).docs[0];
    return userDoc;
  } catch (error) {
    console.log(error);
  }
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "blog-test-4482c.firebaseapp.com",
  projectId: "blog-test-4482c",
  storageBucket: "blog-test-4482c.appspot.com",
  messagingSenderId: "30631584367",
  appId: "1:30631584367:web:719f03276b147f15eda39a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// ADD USER
const userRef = collection(db, "users");
export const addUser = async (username, email, id) => {
  await addDoc(userRef, {
    username,
    email,
    id,
  });
};

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import defaultImage from "./Assets/default_profile_picture.png";

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
export const storage = getStorage(app);

// ADD USER
export const addUser = async (
  username,
  email,
  id,
  age = 0,
  about = "",
  image = defaultImage
) => {
  await setDoc(
    doc(db, "users", id),
    {
      username,
      email,
      age,
      about,
      image,
    },
    { merge: "true" }
  );
};

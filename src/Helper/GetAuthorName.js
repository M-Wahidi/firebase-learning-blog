import { useState, useEffect,useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {UserContext} from '../Context/authContext'
import { auth, db } from "../firebaseConfig";

function GetAuthorName() {
  const [authorName, setAuthorName] = useState("");
  const {isSignIn} = useContext(UserContext)
  const getAuthorName = async () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("id", "==", auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setAuthorName(doc.data().username);
    })
  };

  useEffect(() => {
    if(isSignIn){
      getAuthorName();
    }
  }, [isSignIn]);

  return { authorName };
}

export default GetAuthorName;

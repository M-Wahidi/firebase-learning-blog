import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

function GetAuthorName() {
  const [authorName, setAuthorName] = useState("");

  const getAuthorName = async (id) => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setAuthorName(doc.data().username);
    });
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("auth"))?.id || "";
    getAuthorName(id);
  }, [auth.currentUser]);

  return { authorName };
}

export default GetAuthorName;

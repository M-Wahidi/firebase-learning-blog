import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebaseConfig";
import {
  setPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";
export const UserContext = createContext();

setPersistence(auth, browserSessionPersistence).then(() => {
  return auth.currentUser === null ? signOut(auth) : "";
});

export default function UserProvider({ children }) {
  const [isSignIn, setIsSignIn] = useState("");
  useEffect(() => {
    let timeout;
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsSignIn(user);
        localStorage.setItem("auth", JSON.stringify(true));
      } else {
        setIsSignIn(false);
        localStorage.setItem("auth", JSON.stringify(false));
        clearTimeout(timeout);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ isSignIn, setIsSignIn }}>
      {children}
    </UserContext.Provider>
  );
}

export const User = () => {
  return useContext(UserContext);
};

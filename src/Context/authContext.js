import { createContext, useState } from "react";
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [isSignIn, setIsSignIn] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [editBlog, setEditBlog] = useState({ isEditing: false, blogId: 0 });
  return (
    <UserContext.Provider value={{ isSignIn, setIsSignIn, editBlog, setEditBlog }}>{children}</UserContext.Provider>
  );
}

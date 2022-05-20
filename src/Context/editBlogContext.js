import { createContext, useState } from "react";
export const EditBlogContext = createContext();

export default function EditProvider({ children }) {
  const [editBlog, setEditBlog] = useState({ isEditing: false, blogId: 0 });

  return (
    <EditBlogContext.Provider value={{ editBlog, setEditBlog }}>
      {children}
    </EditBlogContext.Provider>
  );
}

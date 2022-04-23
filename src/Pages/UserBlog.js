import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, deleteDoc, doc, getDoc } from "firebase/firestore";
import {  db,auth } from "../firebaseConfig";
import Blog from "../Components/Blog";
import UpadteBlog from "../Components/UpdateBlog";
function UserBlog() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [oldUserData, setOldUserData] = useState();
  const id = auth.currentUser.uid

  const blogsRef = collection(db, "blogs");
  const userQuery = query(blogsRef, where("authorID", "==", id));
  const getUserBlogs = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(userQuery);
    let blogs = [];
    querySnapshot.forEach((doc) => blogs.push({ ...doc.data(), id: doc.id }));
    setUserBlogs(blogs);
    setLoading(false);
  };

  const handleDeleteBlog = async (id) => {
    setLoading(true);
    let updatedBlogs = [];
    await deleteDoc(doc(blogsRef, id));
    const querySnapshot = await getDocs(blogsRef);
    querySnapshot.forEach((doc) => updatedBlogs.push({ ...doc.data() }));
    setUserBlogs(updatedBlogs);
    setLoading(false);
  };

  const fetchOldUserBlog = async (id) => {
    if (id !== undefined) {
      const docRef = await doc(blogsRef, id);
      const docSnap = await getDoc(docRef);
      setOldUserData(docSnap.data());
      return;
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div className='blogs'>
      <UpadteBlog getUserBlogs={getUserBlogs}  oldUserData={oldUserData} />
      {loading ? (
        <h1 className='blogs-message'>Loading...</h1>
      ) : (
        userBlogs.map((blog, idx) => (
          <Blog key={idx} blog={blog} handleDeleteBlog={handleDeleteBlog} fetchOldUserBlog={fetchOldUserBlog} />
        ))
      )}
      {!loading && userBlogs.length === 0 && <h1 className='blogs-message'>No Blogs To Show</h1>}
    </div>
  );
}

export default UserBlog;

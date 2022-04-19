import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import Blog from "./Blog";
import UpadteBlog from "../Components/UpdateBlog";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [oldUserData, setOldUserData] = useState();

  
  const blogsRef = collection(db, "blogs");

  const getBlogs = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(blogsRef);
    let blogs = [];
    querySnapshot.forEach((doc) => blogs.push({ ...doc.data(), id: doc.id }));
    setBlogs(blogs);
    setLoading(false);
  };

  const handleDeleteBlog = async (id) => {
    setLoading(true);
    let updatedBlogs = [];
    await deleteDoc(doc(blogsRef, id));
    const querySnapshot = await getDocs(blogsRef);
    querySnapshot.forEach((doc) => updatedBlogs.push({ ...doc.data() }));
    setBlogs(updatedBlogs);
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
    getBlogs();
  }, []);

  return (
    <div className='blogs'>
      <UpadteBlog getBlogs={getBlogs}   oldUserData={oldUserData} />
      {loading ? (
        <h1 className='blogs-message'>Loading...</h1>
      ) : (
        blogs.map((blog, idx) => (
          <Blog key={idx} blog={blog} handleDeleteBlog={handleDeleteBlog} fetchOldUserBlog={fetchOldUserBlog} />
        ))
      )}
      {!loading && blogs.length === 0 && <h1 className='blogs-message'>No Blogs To Show</h1>}
    </div>
  );
}

export default Blogs;

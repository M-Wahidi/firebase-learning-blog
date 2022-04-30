import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDoc, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Blog from "./Blog";
import UpadteBlog from "../Components/UpdateBlog";
import { Filter } from "../Context/FilterBlogsContext";
function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [oldUserData, setOldUserData] = useState();
  const blogsRef = collection(db, "blogs");
  const { myBlogs, opitions, filterLoading } = Filter();

  useEffect(() => {
    setLoading(true);
    onSnapshot(blogsRef, (snapshot) => {
      let blogList = [];
      snapshot.forEach((doc) => {
        blogList.push({ ...doc.data(), id: doc.id });
      });
      setTimeout(() => {
        setBlogs(blogList);
        setLoading(false);
      }, 400);
    });
  }, [opitions]);

  const handleDeleteBlog = async (id) => {
    setLoading(true);
    let updatedBlogs = [];
    await deleteDoc(doc(blogsRef, id));
    const querySnapshot = await getDocs(blogsRef);
    querySnapshot.forEach((doc) => updatedBlogs.push({ ...doc.data(), id: doc.id }));
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

  return (
    <div className='blogs'>
      <UpadteBlog oldUserData={oldUserData} />
      {/* Display All Blogs */}
      {opitions === "All Blogs" && loading ? (
        <h1 className='blogs-message'>Loading...</h1>
      ) : (
        opitions === "All Blogs" &&
        loading === false &&
        blogs.map((blog, idx) => (
          <Blog key={idx} blog={blog} handleDeleteBlog={handleDeleteBlog} fetchOldUserBlog={fetchOldUserBlog} />
        ))
      )}

      {/* Display Filtered Blogs */}
      {opitions === "My Blogs" && filterLoading ? (
        <h1 className='blogs-message'>Loading...</h1>
      ) : (
        opitions === "My Blogs" &&
        filterLoading === false &&
        myBlogs.map((blog, idx) => (
          <Blog key={idx} blog={blog} handleDeleteBlog={handleDeleteBlog} fetchOldUserBlog={fetchOldUserBlog} />
        ))
      )}

      {!loading && blogs.length === 0 && <h1 className='blogs-message'>No Blogs To Show</h1>}
    </div>
  );
}

export default Blogs;

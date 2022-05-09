import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebaseConfig";
import LoadingSkeleton from "../Components/LoadingSkeleton";
import EmptyBlogs from "./EmptyBlogs";
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
      const docRef = doc(blogsRef, id);
      const docSnap = await getDoc(docRef);
      setOldUserData(docSnap.data());
      return;
    }
  };
  return (
    <motion.div animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
      <div className='blogs-container'>
        <UpadteBlog oldUserData={oldUserData} />
        {/* Display All Blogs */}
        {opitions === "All Blogs" && loading ? (
          <LoadingSkeleton blogs={blogs} />
        ) : (
          opitions === "All Blogs" &&
          loading === false &&
          blogs.map((blog, idx) => (
            <Blog key={idx} blog={blog} handleDeleteBlog={handleDeleteBlog} fetchOldUserBlog={fetchOldUserBlog} />
          ))
        )}

        {/* Display Filtered Blogs */}
        {opitions === "My Blogs" && filterLoading ? (
          <LoadingSkeleton blogs={myBlogs} />
        ) : (
          opitions === "My Blogs" &&
          filterLoading === false &&
          myBlogs.map((blog, idx) => (
            <Blog key={idx} blog={blog} handleDeleteBlog={handleDeleteBlog} fetchOldUserBlog={fetchOldUserBlog} />
          ))
        )}
        <EmptyBlogs loading={loading} blogs={blogs} opitions={opitions} FilterValue={"All Blogs"} />
        <EmptyBlogs loading={filterLoading} blogs={myBlogs} opitions={opitions} FilterValue={"My Blogs"} />
      </div>
    </motion.div>
  );
}

export default Blogs;

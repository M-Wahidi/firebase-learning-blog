import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { splitTag } from "../Helper/splitTag";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { UserContext } from "../Context/authContext";
import Notification from "./Notification";

function Blog({ blog, handleDeleteBlog, fetchOldUserBlog }) {
  const [authorName, setAuthorName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const { isSignIn, setEditBlog } = useContext(UserContext);

  useEffect(() => {
    const getAuthorName = async () => {
      const userRef = collection(db, "users");
      const q = query(userRef, where("id", "==", blog.authorID));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setAuthorName(doc.data().username);
      });
    };
    getAuthorName();
  }, []);

  const handleEditBlog = () => {
    setEditBlog({ isEditing: true, blogId: blog.id });
    fetchOldUserBlog(blog.id);
  };

  return (
    <div className='blog'>
      <div className='blog-header'>
        <h1>{blog.title}</h1>
        <div className='date-actions-container'>
          <h4>{new Intl.DateTimeFormat("en-GB").format(blog.date.seconds * 1000)}</h4>

          {isSignIn && blog.authorID === auth.currentUser?.uid && (
            <div>
              <button>
                <MdModeEdit onClick={() => handleEditBlog(blog.id)} />
              </button>
              <button onClick={() => setIsCompleted((prev) => !prev)}>
                <MdDelete />
              </button>
            </div>
          )}
        </div>
      </div>
      <p>{blog.body}</p>
      <div className='blog-footer'>
        <div className='blog-author'>@ {!authorName ? "Loading..." : authorName}</div>
        <div className='blog-tags'>{splitTag(blog.tags)}</div>
      </div>
      <Notification
        opition={{
          title: "Delete Item",
          message: "Are You Sure You Want To Delete This Blog",
          cancel: true,
          action: "delete",
        }}
        completed={isCompleted}
        setCompleted={setIsCompleted}
        handleDeleteBlog={handleDeleteBlog}
        blogId={blog.id}
      />
    </div>
  );
}

export default Blog;

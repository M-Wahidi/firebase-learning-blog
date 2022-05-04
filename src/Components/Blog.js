import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { splitTag } from "../Helper/splitTag";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { UserContext } from "../Context/authContext";
import { EditBlogContext } from "../Context/editBlogContext";
import UserReaction from "./UserReaction";
import Notification from "./Notification";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
function Blog({ blog, handleDeleteBlog, fetchOldUserBlog }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { isSignIn } = useContext(UserContext);
  const { setEditBlog } = useContext(EditBlogContext);
  const [ownerBlogName, setOwerBlogName] = useState("");

  const handleEditBlog = () => {
    setEditBlog({ isEditing: true, blogId: blog.id });
    fetchOldUserBlog(blog.id);
  };
  useEffect(() => {
    onSnapshot(doc(db, "users", blog.authorID), (doc) => {
      setOwerBlogName(doc.data());
    });
  }, []);

  return (
    <div className="blog">
      <div className="blog-header">
        <h2>
          {blog.title.length > 35
            ? blog.title.slice(0, 20) + "..."
            : blog.title}
        </h2>
        <div className="date-actions-container">
          <h4>
            {new Intl.DateTimeFormat("en-GB").format(blog.date.seconds * 1000)}
          </h4>

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
      <div className="blog-footer">
        <div className="blog-author">
          @{!blog.name ? "Loading..." : ownerBlogName.username}
          <div className="userInteraction">
            <UserReaction
              likesCount={blog.likesCount}
              disLikesCount={blog.disLikesCount}
              blog={blog}
            />
          </div>
        </div>

        <div className="blog-tags">{splitTag(blog.tags)}</div>
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

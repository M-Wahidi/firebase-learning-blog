import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { splitTag } from "../Helper/splitTag";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { UserContext } from "../Context/authContext";
import { EditBlogContext } from "../Context/editBlogContext";
import { Link } from "react-router-dom";
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
      const { username } = doc.data();
      setOwerBlogName(username);
    });
  }, []);
  return (
    <div className="card">
      <div className="card__header">
        <img
          src="https://cdn.vox-cdn.com/thumbor/xBIBkXiGLcP-kph3pCX61U7RMPY=/0x0:1400x788/1200x800/filters:focal(588x282:812x506)/cdn.vox-cdn.com/uploads/chorus_image/image/70412073/0377c76083423a1414e4001161e0cdffb0b36e1f_760x400.0.png"
          alt="card__image"
          className="card__image"
          width="600"
        />
      </div>
      <div className="card__body">
        <span
          className="tag"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            {blog.tags.map((tag, key) => (
              <span className={`tag  tag-black`} key={key}>
                {tag}
              </span>
            ))}
          </div>
          {isSignIn && blog.authorID === auth.currentUser?.uid && (
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                style={{
                  backgroundColor: "#ee9f0d",
                  border: "none",
                  color: "#fff",
                  padding: "0rem .4rem",
                  fontSize: "1.2rem",
                }}
                onClick={() => handleEditBlog(blog.id)}
              >
                <MdModeEdit />
              </button>

              <button
                style={{
                  background: "#e27d7d",
                  border: "none",
                  color: "#fff",
                  padding: "0rem .4rem",
                  fontSize: "1.2rem",
                }}
                onClick={() => setIsCompleted((prev) => !prev)}
              >
                <MdDelete />
              </button>
            </div>
          )}
        </span>

        <h4
          style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {blog.title.length > 29
            ? blog.title.slice(0, 18) + "..."
            : blog.title}
          <UserReaction
            likesCount={blog.likesCount}
            disLikesCount={blog.disLikesCount}
            blog={blog}
          />
        </h4>

        {blog.body.length > 100 ? (
          <p>{blog.body.slice(0, 150)}</p>
        ) : (
          <p>{blog.body}</p>
        )}
      </div>
      <div className="card__footer">
        <div className="user">
          <img
            src={auth.currentUser.photoURL}
            alt="user__image"
            className="user__image"
          />
          <div className="user__info">
            <h5> @{ownerBlogName.slice(0, 18)}</h5>

            <small>
              {new Intl.DateTimeFormat("en-GB").format(
                blog.date.seconds * 1000
              )}
            </small>

            <span
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                userSelect: "none",
                wordBreak: "break-word",
                textDecoration: "none",
                position: "absolute",
                right: "1rem",
                color: "red",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "#333",
                  fontSize: "16px",
                }}
                to={`blog/@${ownerBlogName}/${blog.title}-${blog.id}`}
              >
                Read More...
              </Link>
            </span>
          </div>
        </div>
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

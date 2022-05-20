import React, { useState, useContext, useEffect } from "react";
import BlogReadTime from "./BlogReadTime";
import { auth } from "../firebaseConfig";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { UserContext } from "../Context/AuthContext";
import { EditBlogContext } from "../Context/EditBlogContext";
import { Link } from "react-router-dom";
import UserReaction from "./UserReaction";
import Notification from "./Notification";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";
import DefaultProfilePicture from "../Assets/default_profile_picture.png";

function Blog({ blog, handleDeleteBlog, fetchOldUserBlog }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { isSignIn } = useContext(UserContext);
  const { setEditBlog } = useContext(EditBlogContext);
  const [ownerBlogName, setOwerBlogName] = useState("");
  const [ownerPhoto, setOwerPhoto] = useState("");
  const [didImageLoad, setImageLoad] = useState(false);

  const handleEditBlog = () => {
    setEditBlog({ isEditing: true, blogId: blog.id });
    fetchOldUserBlog(blog.id);
  };
  useEffect(() => {
    onSnapshot(doc(db, "users", blog.authorID), (doc) => {
      const { username, image } = doc.data();
      setOwerBlogName(username);
      setOwerPhoto(image);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.4, delay: 0.1 }}
      className="card"
    >
      <div className="blog_image">
        <img
          onLoad={() => setImageLoad(true)}
          src={blog.image}
          alt={blog.title}
        />
        {!didImageLoad && <h5 style={{ textAlign: "center" }}>Loading...</h5>}
      </div>

      <div className="card__body">
        <span
          className="tag"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: ".2rem",
            }}
          >
            {blog.tags.map((tag, key) => (
              <span className={`tag  tag-black`} key={key}>
                {tag}
              </span>
            ))}
          </div>
          {isSignIn && blog.authorID === auth.currentUser?.uid && (
            <div style={{ display: "flex", gap: ".5rem" }}>
              <button
                style={{
                  backgroundColor: "#ee9f0d",
                  border: "none",
                  color: "#fff",
                  padding: "0rem .4rem",
                  height: "30px",
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
          {blog.title.length > 22
            ? blog.title.slice(0, 16) + "..."
            : blog.title}
          <UserReaction
            likesCount={blog.likesCount}
            disLikesCount={blog.disLikesCount}
            blog={blog}
            color={"black"}
          />
        </h4>

        {blog.body.length > 100 ? (
          <p style={{ textAlign: "justify" }}>
            {blog.body.slice(0, 190) + "..."}
          </p>
        ) : (
          <p style={{ textAlgin: "justify" }}>{blog.body}</p>
        )}
      </div>
      <div className="card__footer">
        <div className="user">
          <Link to={`profile/${ownerBlogName}/${blog.authorID}`}>
            <img
              src={ownerPhoto || DefaultProfilePicture}
              alt="user__image"
              className="user__image"
            />
          </Link>
          <div className="user__info">
            <span> @{ownerBlogName.slice(0, 18)}</span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: ".7rem",
              }}
            >
              {new Intl.DateTimeFormat("en-GB").format(
                blog.date.seconds * 1000
              )}
              <span>{BlogReadTime(blog.body)}</span>

              <span
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  userSelect: "none",
                  wordBreak: "break-word",
                  textDecoration: "none",
                  position: "relative",
                }}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    fontSize: "14px",
                  }}
                  to={`blog/@${ownerBlogName}/${blog.id}`}
                >
                  Read More...
                </Link>
              </span>
            </div>
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
    </motion.div>
  );
}

export default Blog;

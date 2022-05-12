import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogReadTime from "../Components/BlogReadTime";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import UserReaction from "../Components/UserReaction";
import { motion } from "framer-motion";
import { splitTag } from "../Helper/splitTag";

function BlogDetails() {
  let { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [userName, setUserName] = useState(null);

  const splitID = (id) => {
    return id.split("-")[1];
  };

  const getBlogData = async (id) => {
    onSnapshot(doc(db, "blogs", id), (blogInfo) => {
      setBlog({ ...blogInfo.data(), id: id });
      getUserName(blogInfo.data().authorID);
    });
  };

  const getUserName = (id) => {
    onSnapshot(doc(db, "users", id), (user) => {
      setUserName(user.data().username);
    });
  };

  useEffect(() => {
    const blogID = splitID(id);
    getBlogData(blogID);
  }, []);

  return (
    blog && (
      <div className='blog-details'>
        <motion.div animate={{ x: 0 }} initial={{ x: 1000 }} transition={{ ease: "easeOut", duration: 0.3 }}>
          <header>
            <div className='container'>
              <h2>{blog.title}</h2>
              <small>
                By <span>@{userName}</span> | Posted on:
                <span> {new Intl.DateTimeFormat("en-GB").format(blog.date.seconds * 1000)}</span>
                <small style={{ marginTop: "7px", display: "flex", gap: ".5rem", alignItems: "center" }}>
                  {blog.tags.map((tag, key) => (
                    <span className={`tag`} key={key}>
                      {`${tag} |`}
                    </span>
                  ))}
                  {BlogReadTime(blog.body)}
                </small>
              </small>
            </div>
          </header>
        </motion.div>

        <article className='container'>
          <motion.div animate={{ x: 0 }} initial={{ x: 1000 }} transition={{ ease: "easeOut", duration: 0.3 }}>
            <div
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                width: "100%",
                minHeight: "55vh",
              }}
            >
              {blog.body}
            </div>
          </motion.div>

          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            <div className='like-section'>
              <UserReaction
                likesCount={blog?.likesCount}
                disLikesCount={blog?.disLikesCount}
                blog={blog}
                color={"rebeccapurple"}
              />
            </div>
          </motion.div>
        </article>

        <footer>
          <div className='container'>
            <p>&copy; {new Date().getFullYear()} WebDev Blog</p>
          </div>
        </footer>
      </div>
    )
  );
}

export default BlogDetails;

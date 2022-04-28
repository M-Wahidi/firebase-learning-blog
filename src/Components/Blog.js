import React, { useState, useContext } from "react";
import { auth } from "../firebaseConfig";
import { splitTag } from "../Helper/splitTag";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { UserContext } from "../Context/authContext";
import { EditBlogContext } from "../Context/editBlogContext";
import Likes from "../Components/BlogLikes";
import Notification from "./Notification";

function Blog({ blog, handleDeleteBlog, fetchOldUserBlog }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { isSignIn } = useContext(UserContext);
  const { setEditBlog } = useContext(EditBlogContext);

  const handleEditBlog = () => {
    setEditBlog({ isEditing: true, blogId: blog.id });
    fetchOldUserBlog(blog.id);
  };



  return (
    <div className='blog'>
      <div className='blog-header'>
        <h1>{blog.title.length > 40 ? blog.title.slice(0, 40) + "..." : blog.title}</h1>
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
        <div className='blog-author'>@{!blog.name ? "Loading..." : blog.name}</div>
        <div className='userInteraction'>
          <Likes blogID={blog.id} likeCount={blog.likesCount} />
        </div>
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

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import UserReaction from "../Components/UserReaction";
import { UserContext } from "../Context/authContext";
import { EditBlogContext } from "../Context/editBlogContext";
import UpadteBlog from "../Components/UpdateBlog";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { splitTag } from "../Helper/splitTag";
import Notification from "../Components/Notification";
import Loading from "../Components/Loading";

function BlogDetails() {
  let { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldUserData, setOldUserData] = useState();
  const { isSignIn } = useContext(UserContext);
  const { setEditBlog } = useContext(EditBlogContext);
  const navigate = useNavigate();

  const splitID = (id) => {
    return id.split("-")[1];
  };

  const getBlogData = async (id) => {
    onSnapshot(doc(db, "blogs", id), (blogInfo) => {
      setBlog(blogInfo.data());
      getUserName(blogInfo.data().authorID);
    });
  };

  const getUserName = (id) => {
    onSnapshot(doc(db, "users", id), (user) => {
      setUserName(user.data().username);
    });
  };

  const handleDeleteBlog = async () => {
    setLoading(true);
    const blogID = splitID(id);
    await deleteDoc(doc(db, "blogs", blogID));
    setLoading(false);
    setTimeout(() => {
      navigate("/");
    }, 200);
  };

  const handleEditBlog = () => {
    const blogID = splitID(id);
    setEditBlog({ isEditing: true, blogId: blogID });
    setOldUserData(blog);
  };

  useEffect(() => {
    const blogID = splitID(id);
    getBlogData(blogID);
  }, []);

  return (
    blog && (
      <div className="blog blog-details">
        <UpadteBlog oldUserData={oldUserData} />

        <div className="blog-header">
          <h3 style={{ fontWeight: "bold" }}>{blog.title}</h3>
          <div className="date-actions-container">
            <h5>
              {new Intl.DateTimeFormat("en-GB").format(
                blog.date.seconds * 1000
              )}
            </h5>

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
        <div className="blog-body">{blog.body}</div>
        <div className="blog-footer">
          <div className="blog-author">
            @{userName}
            <div className="userInteraction">
              {/* <UserReaction
                //  likesCount={blog.likesCount}
                //     disLikesCount={blog.disLikesCount}
                // blog={blog}
              // /> */}
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
        {loading && <Loading />}
      </div>
    )
  );
}

export default BlogDetails;

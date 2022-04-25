import { useState, useContext } from "react";
import { BiComment, BiHeart, BiShare } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { UserContext } from "../Context/authContext";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import Notification from "./Notification";
function BlogLikes({ blogID, likeCount }) {
  const [likesCount, setLikesCount] = useState(likeCount);
  const { isSignIn } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(false);
  const [showAuthMsg, setShowInputMsge] = useState(false);
  const blogRef = collection(db, "blogs");
  const targetBlog = doc(blogRef, blogID);

  // Display UnAuth User Message
  const chechkUserAuth = () => {
    if (isSignIn?.email === undefined) {
      setShowInputMsge(true);
      setTimeout(() => {
        setShowInputMsge(false);
      }, 10000);
      return true;
    }
  };

  const handleLikesClick = async () => {
    if (chechkUserAuth()) return;
    setIsLiked((prev) => !prev);
    isLiked ? setLikesCount((prev) => prev - 1) : setLikesCount((prev) => prev + 1);
    setLikesCountToDB();
  };

  // Send Likes Count To DB
  const setLikesCountToDB = async () => {
    try {
      const blogLike = await getDoc(targetBlog);
      const count = blogLike.data().likesCount;
      const toogleLike = isLiked ? Number(count - 1) : Number(count + 1);
      await setDoc(
        targetBlog,
        {
          likesCount: toogleLike,
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const addLikedBlogToUser = () => {};

  return (
    <div className='userInteraction' onClick={chechkUserAuth}>
      <div>
        <span style={{ margin: "0 2px" }}>50</span>
        <span>
          <BiComment />
        </span>
      </div>

      <div onClick={handleLikesClick}>
        <span style={{ margin: "0 2px" }}>{likesCount}</span>
        <span style={{ color: `${isLiked && isSignIn ? "#d41608" : ""}` }}>
          {isLiked && isSignIn ? <AiFillHeart /> : <BiHeart />}
        </span>
      </div>

      <div>
        <BiShare />
      </div>
      <Notification
        opition={{
          title: "Connect With Other Developer 😀",
          message: `Signin OR Create Account`,
          action: "login",
          actiontwo: "signup",
        }}
        completed={showAuthMsg}
      />
    </div>
  );
}

export default BlogLikes;

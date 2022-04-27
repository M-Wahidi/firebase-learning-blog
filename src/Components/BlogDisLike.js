import { useState, useContext, useEffect } from "react";
import { AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { UserContext } from "../Context/authContext";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, collection, where, query, getDocs } from "firebase/firestore";
import Notification from "./Notification";

function BlogDisLikes({ blogID, disLikeCount }) {
  const [disLikesCount, setDisLikesCount] = useState(disLikeCount);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const { isSignIn } = useContext(UserContext);
  const [showAuthMsg, setShowInputMsge] = useState(false);
  const userRef = collection(db, "users");
  const blogRef = collection(db, "blogs");
  const targetBlog = doc(blogRef, blogID);
  let disLikedBlogs = "";
  let documentID = "";

  // Display UnAuth User Message
  const chechkUserAuth = () => {
    if (!isSignIn) {
      setShowInputMsge(true);
      setTimeout(() => {
        setShowInputMsge(false);
      }, 10000);
      return true;
    }
  };

  const handleDisLikesClick = async () => {
    if (chechkUserAuth()) return;
    setIsDisLiked((prev) => !prev);
    isDisLiked ? setDisLikesCount((prev) => prev - 1) : setDisLikesCount((prev) => prev + 1);
    setDisLikesCountToDB();
    addDisLikedBlogToUser();
  };

  // Send Likes Count To DB
  const setDisLikesCountToDB = async () => {
    try {
      const blogDisLike = await getDoc(targetBlog);
      const count = blogDisLike.data().disLikeCount;
      const toogleDisLike = isDisLiked ? Number(count - 1) : Number(count + 1);
      await setDoc(
        targetBlog,
        {
          disLikeCount: toogleDisLike,
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getDisLikedBlogs = async () => {
      if (isSignIn.email !== undefined) {
        await setDisLikedBlog();
        disLikedBlogs.some((elem) => (elem === blogID ? setIsDisLiked(true) : ""));
      }
    };
    getDisLikedBlogs();
  }, []);

  const setDisLikedBlog = async () => {
    const userQuery = query(userRef, where("id", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((doc) => {
      disLikedBlogs = doc.data().disLikedBlogs;
      documentID = doc.id;
    });
  };

  const addDisLikedBlogToUser = async () => {
    await setDisLikedBlog();
    // Compare if Blogs Available
    const checkDuplicateBlogs = () => {
      if (disLikedBlogs.length === 0) {
        addBlog();
        return;
      }
      disLikedBlogs.every((blog) => (blog !== blogID ? addBlog() : removeBlog()));
    };
    // ADD LIKE TO BLOGS LIST
    const addBlog = async () => {
      await setDoc(
        doc(db, "users", documentID),
        {
          disLikedBlogs: [...disLikedBlogs, blogID],
        },
        { merge: true }
      );
    };
    // REMOVE LIKE FROM BLOGS LIST
    const removeBlog = async () => {
      disLikedBlogs = disLikedBlogs.filter((blog) => blog !== blogID);
      await setDoc(
        doc(db, "users", documentID),
        {
          disLikedBlogs: disLikedBlogs,
        },
        { merge: true }
      );
    };

    checkDuplicateBlogs();
  };

  return (
    <div onClick={chechkUserAuth}>
      <div onClick={() => handleDisLikesClick("like")}>
        <span style={{ margin: "0 2px" }}>{disLikesCount}</span>
        <span style={{ color: "red" }}>{isDisLiked && isSignIn && <AiFillDislike />}</span>
        <span>{!isDisLiked && isSignIn && <AiOutlineDislike />}</span>
        <span>{!isSignIn && <AiOutlineDislike />}</span>
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

export default BlogDisLikes;

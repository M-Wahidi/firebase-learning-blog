import { useState, useContext, useEffect } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { UserContext } from "../Context/authContext";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, collection, where, query, getDocs } from "firebase/firestore";
import Notification from "./Notification";

function BlogLikes({ blogID, likeCount }) {
  const [likesCount, setLikesCount] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(false);
  const { isSignIn } = useContext(UserContext);
  const [showAuthMsg, setShowInputMsge] = useState(false);
  const userRef = collection(db, "users");
  const blogRef = collection(db, "blogs");
  const targetBlog = doc(blogRef, blogID);
  let likedBlogs = "";
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

  const handleLikesClick = async () => {
    if (chechkUserAuth()) return;
    // setIsLiked(prev => !prev)
    // isLiked ? setLikesCount((prev) => prev - 1) : setLikesCount((prev) => prev + 1);
    // setLikesCountToDB();
    // addLikedBlogToUser();
  };




  
  // Send Likes Count To DB
  // const setLikesCountToDB = async () => {
  //   try {
  //     const blogLike = await getDoc(targetBlog);
  //     const count = blogLike.data().likesCount;
  //     const toogleLike = isLiked ? Number(count - 1) : Number(count + 1);
  //     await setDoc(
  //       targetBlog,
  //       {
  //         likesCount: toogleLike,
  //       },
  //       { merge: true }
  //     );
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // useEffect(() => {
  //   const getLikedBlogs = async () => {
  //     if (isSignIn.email !== undefined) {
  //       await setLikedBlog();
  //       likedBlogs.some((elem) => (elem === blogID ? setIsLiked(true) : ""));
  //     }
  //   };
  //   getLikedBlogs();
  // }, []);

  // const setLikedBlog = async () => {
  //   const userQuery = query(userRef, where("id", "==", auth.currentUser.uid));
  //   const querySnapshot = await getDocs(userQuery);
  //   querySnapshot.forEach((doc) => {
  //     likedBlogs = doc.data().likedBlogs;
  //     documentID = doc.id;
  //   });
  // };

  // const addLikedBlogToUser = async () => {
  //   await setLikedBlog();
  //   // Compare if Blogs Available
  //   const checkDuplicateBlogs = () => {
  //     if (likedBlogs.length === 0) {
  //       addBlog();
  //       return;
  //     }
  //     likedBlogs.every((blog) => (blog !== blogID ? addBlog() : removeBlog()));
  //   };
  //   // ADD LIKE TO BLOGS LIST
  //   const addBlog = async () => {
  //     await setDoc(
  //       doc(db, "users", documentID),
  //       {
  //         likedBlogs: [...likedBlogs, blogID],
  //       },
  //       { merge: true }
  //     );
  //   };
  //   // REMOVE LIKE FROM BLOGS LIST
  //   const removeBlog = async () => {
  //     likedBlogs = likedBlogs.filter((blog) => blog !== blogID);
  //     await setDoc(
  //       doc(db, "users", documentID),
  //       {
  //         likedBlogs: likedBlogs,
  //       },
  //       { merge: true }
  //     );
  //   };

  //   checkDuplicateBlogs();
  // };

  return (
    <div>
      <div onClick={() => handleLikesClick("like")}>
        <span style={{ margin: "0 2px" }}>{likesCount}</span>
        <span style={{ color: "green" }}>{isLiked && isSignIn && <AiFillLike />}</span>
        <span>{!isLiked && isSignIn && <AiOutlineLike />}</span>
        <span>{!isSignIn && <AiOutlineLike />}</span>
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

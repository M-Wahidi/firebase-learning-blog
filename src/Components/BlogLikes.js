import { useState, useContext, useEffect } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { UserContext } from "../Context/authContext";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, collection, where,query,getDocs } from "firebase/firestore";
import Notification from "./Notification";

function BlogLikes({ blogID, likeCount }) {
  const [likesCount, setLikesCount] = useState(likeCount);
  const { isSignIn } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(false);
  const [showAuthMsg, setShowInputMsge] = useState(false);
  const userRef =  collection(db,'users')
  const blogRef = collection(db, "blogs");
  const targetBlog = doc(blogRef, blogID);

  // Display UnAuth User Message
  const chechkUserAuth = () => {
    // console.log(isSignIn?.email === undefined)
    // console.log(auth.currentUser === null)

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
    addLikedBlogToUser()
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

  useEffect(() =>{
    const getLikedBlogs =async () =>{
      const userQuery = query(userRef, where("id", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(userQuery);
      let likedBlogs = ''
      querySnapshot.forEach((doc) => {
        likedBlogs = doc.data().likedBlogs;
    })
    likedBlogs.map(blog => blog === blogID ? setIsLiked(true) : '')
}
getLikedBlogs()
  },[])



  const addLikedBlogToUser = async () => {
    const userQuery = query(userRef, where("id", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(userQuery);
    let likedBlogs = ''
    querySnapshot.forEach((doc) => {
      likedBlogs = doc.data().likedBlogs;
});

 
  const checkDuplicateBlogs = () =>{
    if (likedBlogs.length === 0){
      addBlog()
      return
    }
  
  likedBlogs.every(blog => blog  !== blogID ? addBlog()  :  removeBlog() )
  }

    const addBlog = async () =>{
        await setDoc(doc(db, "users", "B5SvRnmPAzbp3RxX09hm"), {
        likedBlogs:[...likedBlogs,blogID]
        },  { merge: true });
    } 

    const removeBlog = async () =>{
      likedBlogs= likedBlogs.filter(blog => blog !== blogID)
      console.log(likedBlogs)
      await setDoc(doc(db, "users", "B5SvRnmPAzbp3RxX09hm"), {
      likedBlogs:likedBlogs
      },  { merge: true });
  }
    checkDuplicateBlogs()
}

  return (
    <div className='userInteraction' onClick={chechkUserAuth}>
      <div onClick={handleLikesClick}>
        <span style={{ margin: "0 2px" }}>{likesCount}</span>
        <span style={{ color: `${isLiked && isSignIn ? "green" : ""}` }}>
          <AiOutlineLike />
        </span>
      </div>

      <div>
        <span style={{ margin: "0 2px" }}>50</span>
        <span>
          <AiOutlineDislike />
        </span>
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

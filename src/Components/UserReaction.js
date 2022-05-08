import { useState, useContext, useReducer, useEffect } from "react";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { UserContext } from "../Context/authContext";
import Notification from "./Notification";

const reducer = (state, action) => {
  switch (action.type) {
    // Toggle Like
    case "INITIAL_LIKE":
      return {
        likesCount: state.likesCount + 1,
        isLiked: true,
        disLikesCount: state.disLikesCount,
        isDisLike: false,
      };
    case "LIKE":
      return {
        likesCount: state.likesCount + 1,
        isLiked: true,
        disLikesCount: state.disLikesCount - 1,
        isDisLike: false,
      };
    case "RESET_LIKE":
      return {
        likesCount: state.likesCount - 1,
        isLiked: false,
        disLikesCount: state.disLikesCount,
        isDisLike: false,
      };
    case "TOOGLE_LIKE":
      return {
        isLiked: true,
        isDisLike: false,
        likesCount: state.likesCount,
        disLikesCount: state.disLikesCount,
      };

    // Toggle DISLIKE
    case "INITIAL_DISLIKE":
      return {
        disLikesCount: state.disLikesCount + 1,
        isDisLike: true,
        likesCount: state.likesCount,
        isLiked: false,
      };
    case "DISLIKE":
      return {
        disLikesCount: state.disLikesCount + 1,
        isDisLike: true,
        likesCount: state.likesCount - 1,
        isLiked: false,
      };
    case "RESET_DISLIKE":
      return {
        disLikesCount: state.disLikesCount - 1,
        isDisLike: false,
        likesCount: state.likesCount,
        isLiked: false,
      };
    case "Toogle_DISLIKE":
      return {
        isLiked: false,
        isDisLike: true,
        likesCount: state.likesCount,
        disLikesCount: state.disLikesCount,
      };
    default:
      throw new Error();
  }
};

function UserReaction({ likesCount, disLikesCount, blog }) {
  const { isSignIn } = useContext(UserContext);
  const [showAuthMsg, setShowInputMsge] = useState(false);
  const userLikedBlogs = blog.userLiked;
  const userDisLikedBlogs = blog.userDisLiked;
  const initialState = {
    likesCount,
    isLiked: false,
    disLikesCount,
    isDisLike: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const blogRef = collection(db, "blogs");
  // Display UnAuth User Message
  const handleUnAuthUser = () => {
    setShowInputMsge(true);
    setTimeout(() => {
      setShowInputMsge(false);
    }, 10000);
    return true;
  };

  // Handle Like Click
  const handleLike = async () => {
    if (auth.currentUser === null) {
      handleUnAuthUser();
      return;
    }
    toogleLikeState();
    setLikeAction();
  };

  // Handle DISLike Click
  const handleDisLike = async () => {
    if (auth.currentUser === null) {
      handleUnAuthUser();
      return;
    }
    toogleDislikeState();
    setDisLikeAction();
  };

  // ToogleLike
  const toogleLikeState = () => {
    if (state.isLiked === false && state.isDisLike === false) {
      dispatch({ type: "INITIAL_LIKE" });
    }
    if (state.isDisLike) {
      dispatch({ type: "LIKE" });
    }
    if (state.isLiked) {
      dispatch({ type: "RESET_LIKE" });
    }
  };

  // ToggleDislike
  const toogleDislikeState = () => {
    if (state.isLiked === false && state.isDisLike === false) {
      dispatch({ type: "INITIAL_DISLIKE" });
    }
    if (state.isLiked) {
      dispatch({ type: "DISLIKE" });
    }
    if (state.isDisLike) {
      dispatch({ type: "RESET_DISLIKE" });
    }
  };

  // SetLikeToDB
  const setLikeAction = async () => {
    if (state.isDisLike) {
      await setDoc(
        doc(blogRef, blog.id),
        {
          disLikesCount: state.disLikesCount - 1,
          userDisLiked: userDisLikedBlogs.filter(
            (elem) => elem !== auth.currentUser.uid
          ),
          likesCount: state.likesCount + 1,
          userLiked: [...userLikedBlogs, auth.currentUser.uid],
        },
        { merge: true }
      );
      return;
    }
    await setDoc(
      doc(blogRef, blog.id),
      {
        likesCount: state.isLiked ? state.likesCount - 1 : state.likesCount + 1,
        userLiked: state.isLiked
          ? userLikedBlogs.filter((elem) => elem !== auth.currentUser.uid)
          : [...userLikedBlogs, auth.currentUser.uid],
      },
      { merge: true }
    );
  };

  // SetDisLikeToDB
  const setDisLikeAction = async () => {
    if (state.isLiked) {
      await setDoc(
        doc(blogRef, blog.id),
        {
          likesCount: state.likesCount - 1,
          userLiked: userLikedBlogs.filter(
            (elem) => elem !== auth.currentUser.uid
          ),
          disLikesCount: state.isDisLike + 1,
          userDisLiked: [...userDisLikedBlogs, auth.currentUser.uid],
        },
        { merge: true }
      );
      return;
    }
    await setDoc(
      doc(blogRef, blog.id),
      {
        disLikesCount: state.isDisLike
          ? state.disLikesCount - 1
          : state.disLikesCount + 1,

        userDisLiked: state.isDisLike
          ? userDisLikedBlogs.filter((elem) => elem !== auth.currentUser.uid)
          : [...userDisLikedBlogs, auth.currentUser.uid],
      },
      { merge: true }
    );
  };

  // Watch for Changes on Documnet

  onSnapshot(doc(blogRef, blog.id), (doc) => {
    let likedData = doc.data()?.likesCount;
    let disLikedData = doc.data()?.disLikesCount;
    state.likesCount = likedData;
    state.disLikesCount = disLikedData;
  });

  //Set Like/DisLike State on Page Load
  useEffect(() => {
    if (!userLikedBlogs || !userDisLikedBlogs) return;
    if (userLikedBlogs.some((elem) => elem === auth.currentUser?.uid)) {
      dispatch({ type: "TOOGLE_LIKE" });
    }
    if (userDisLikedBlogs.some((elem) => elem === auth.currentUser?.uid)) {
      dispatch({ type: "Toogle_DISLIKE" });
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div onClick={handleLike} style={{ cursor: "pointer" }}>
        <span style={{ margin: "0 2px" }}>{state.likesCount}</span>
        <span style={{ color: "black" }}>
          {state.isLiked && isSignIn && <AiFillLike />}
        </span>
        <span>{!state.isLiked && isSignIn && <AiOutlineLike />}</span>
        <span>{!isSignIn && <AiOutlineLike />}</span>
      </div>

      <div onClick={handleDisLike} style={{ cursor: "pointer" }}>
        <span style={{ margin: "0 2px" }}>{state.disLikesCount}</span>
        <span style={{ color: "black" }}>
          {state.isDisLike && isSignIn && <AiFillDislike />}
        </span>
        <span>{!state.isDisLike && isSignIn && <AiOutlineDislike />}</span>
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

export default UserReaction;

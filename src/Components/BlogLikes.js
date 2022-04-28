import { useState, useContext } from "react";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { UserContext } from "../Context/authContext";
import Notification from "./Notification";

function BlogLikes({ blogID, likesCount, disLikesCount }) {
  const [likeCount, setLikeCount] = useState(likesCount);
  const [isLiked, setIsLiked] = useState(false);
  const [disLikeCount, setDisLikeCount] = useState(disLikesCount);
  const [isDisLike, setIsDisLike] = useState(false);
  const { isSignIn } = useContext(UserContext);
  const [showAuthMsg, setShowInputMsge] = useState(false);

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

  const handleLike = () => {
    if (chechkUserAuth()) return;
    setIsLiked(true);

    if (isLiked === false && isDisLike === false) {
      setLikeCount((prev) => prev + 1);
    }
    if (isDisLike) {
      setLikeCount((prev) => prev + 1);
      setDisLikeCount((prev) => prev - 1);
      setIsLiked(true);
      setIsDisLike(false);
    }
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  const handleDisLike = () => {
    if (chechkUserAuth()) return;
    setIsDisLike(true);

    if (isLiked === false && isDisLike === false) {
      setDisLikeCount((prev) => prev + 1);
    }
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setDisLikeCount((prev) => prev + 1);
      setIsLiked(false);
      setIsDisLike(true);
    }
    if (isDisLike) {
      setDisLikeCount((prev) => prev - 1);
      setIsDisLike(false);
    }
  };

  return (
    <div className='userInteraction'>
      <div onClick={handleLike}>
        <span style={{ margin: "0 2px" }}>{likeCount}</span>
        <span style={{ color: "green" }}>{isLiked && isSignIn && <AiFillLike />}</span>
        <span>{!isLiked && isSignIn && <AiOutlineLike />}</span>
        <span>{!isSignIn && <AiOutlineLike />}</span>
      </div>

      <div onClick={handleDisLike}>
        <span style={{ margin: "0 2px" }}>{disLikeCount}</span>
        <span style={{ color: "red" }}>{isDisLike && isSignIn && <AiFillDislike />}</span>
        <span>{!isDisLike && isSignIn && <AiOutlineDislike />}</span>
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

export default BlogLikes;

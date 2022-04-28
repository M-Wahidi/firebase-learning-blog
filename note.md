import { useState } from "react";
import "./styles.css";

export default function App() {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const [isDisLike, setIsDisLike] = useState(false);

  const handleLike = () => {
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
    <div className="App">
      <button onClick={handleLike}>
        Liked <span> {likeCount} </span>
      </button>
      <button onClick={handleDisLike}>
        Dislike <span> {disLikeCount} </span>
      </button>
    </div>
  );
}

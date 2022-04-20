import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { UserContext } from "../Context/authContext";
import Loading from "./Loading";

function Notification({ opition, error, completed, setCompleted, handleDeleteBlog, blogId }) {
  const { setIsSignIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const handleUserAction = async () => {
    setLoading(true);
    setCompleted((prev) => !prev);

    if (opition.action === "delete") {
      setTimeout(() => {
        setLoading(false);
        handleDeleteBlog(blogId);
      }, 1500);
    }
    if (opition.action === "logout") {
      setTimeout(() => {
        setLoading(false);
        signOut(auth);
        setIsSignIn(false);
        localStorage.setItem("auth", false);
      }, 1500);
    }
  };

  return (
    <div className={`notifcationMessage ${error && "active"} ${completed && "active"}`}>
      <h1>{opition.title}</h1>
      <p>{opition.message}</p>
      <div>
        {opition.cancel && <button onClick={() => setCompleted((prev) => !prev)}>Cancel </button>}

        {(opition.action === "delete" || opition.action === "logout") && (
          <button onClick={handleUserAction} className={opition.action}>
            {opition.action}
          </button>
        )}
        {opition.action === "edit" && <button className={opition.action}>{opition.action}</button>}
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default Notification;

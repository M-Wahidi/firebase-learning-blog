import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { UserContext } from "../Context/authContext";
import { Filter } from "../Context/FilterBlogsContext";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

function Notification({ opition, error, completed, setCompleted, handleDeleteBlog, blogId, setShowProfile }) {
  const { setIsSignIn } = useContext(UserContext);
  const { setOpitions } = Filter();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        setShowProfile(false);
        setLoading(false);
        signOut(auth);
        setIsSignIn(false);
        setOpitions("All Blogs");
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className={`notifcationMessage ${error && "active"} ${completed && "active"}`}>
      <h3>{opition.title}</h3>
      <h5>{opition.message}</h5>
      <div style={{ width: "100%" }}>
        {opition.cancel && <button onClick={() => setCompleted((prev) => !prev)}>Cancel </button>}

        {(opition.action === "delete" || opition.action === "logout") && (
          <button onClick={handleUserAction} className={opition.action}>
            {opition.action}
          </button>
        )}
        {opition.action === "edit" && <button className={opition.action}>{opition.action}</button>}
        {opition.action === "login" && (
          <button className={opition.action} onClick={() => navigate("/account/login")}>
            {opition.action}
          </button>
        )}
        {opition.actiontwo === "signup" && (
          <button className={opition.action} onClick={() => navigate("/account/signup")}>
            {opition.actiontwo}
          </button>
        )}
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default Notification;

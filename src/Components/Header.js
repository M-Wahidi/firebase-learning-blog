import "../index.css";
import { auth } from "../firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../Context/authContext";
import Notification from "./Notification";
import GetAuthorName from "../Helper/GetAuthorName";
function Header() {
  const { isSignIn, setIsSignIn } = useContext(UserContext);
  const [isCompleted, setIsCompleted] = useState(false);
  const location = useLocation().pathname;
  const [routerPath, setRouterPath] = useState("");
  const { authorName } = GetAuthorName();

  useEffect(() => {
    setIsSignIn(JSON.parse(localStorage.getItem("auth")));
    setRouterPath(location);
  }, [location]);

  return (
    <div className='header'>
      <div style={{ position: "relative" }}>
        <Link to='/'>WebDev Blog 😀 </Link>
        <div style={{ position: "absolute", color: "#fff", left: "0.8rem", top: "30px", fontSize: "14px" }}>
          {auth.currentUser === null ? "" : `@ ${authorName}`}
        </div>
      </div>

      {isSignIn && (
        <Link
          to='create-post'
          style={{ backgroundColor: `${routerPath === "/create-post" ? "rgb(164, 162, 162)" : ""}` }}
          onClick={() => setRouterPath(location)}
        >
          Create Blog
        </Link>
      )}

      {isSignIn && (
        <Link
          to={`user-blogs`}
          style={{ backgroundColor: `${routerPath === "/user-blogs" ? "rgb(164, 162, 162)" : ""}` }}
          onClick={() => setRouterPath(location)}
        >
          My Blogs
        </Link>
      )}

      {isSignIn ? (
        <button className='logout-btn' onClick={() => setIsCompleted((prev) => !prev)}>
          Logout
        </button>
      ) : (
        <Link to='/account/login'>Login</Link>
      )}
      <Notification
        opition={{
          title: "Logout!",
          message: "Are You Sure You Want To Logout",
          cancel: true,
          action: "logout",
        }}
        completed={isCompleted}
        setCompleted={setIsCompleted}
      />
    </div>
  );
}

export default Header;

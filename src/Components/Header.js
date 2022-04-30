import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/authContext";
import Notification from "./Notification";
import GetAuthorName from "../Helper/GetAuthorName";
import { auth } from "../firebaseConfig";
import "../index.css";

function Header() {
  const { isSignIn } = useContext(UserContext);
  const [isCompleted, setIsCompleted] = useState(false);
  const { authorName } = GetAuthorName();

  return (
    <div className="header">
      <div style={{ position: "relative" }}>
        <Link to="/">WebDev Blog🔥🚀</Link>

        <div
          style={{
            position: "absolute",
            color: "#fff",
            left: "0.8rem",
            top: "30px",
            fontSize: "14px",
          }}
        >
          {auth.currentUser && `@ ${authorName}`}
        </div>
      </div>
      {isSignIn && (
        <button
          className="logout-btn"
          onClick={() => setIsCompleted((prev) => !prev)}
        >
          Logout
        </button>
      )}
      {!isSignIn && <Link to="/account/login">Login</Link>}
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

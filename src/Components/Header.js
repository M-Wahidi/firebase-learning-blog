import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/authContext";
import Notification from "./Notification";
import GetAuthorName from "../Helper/GetAuthorName";
import { auth } from "../firebaseConfig";
import { MdLogout } from "react-icons/md";
import "../index.css";

function Header() {
  const { isSignIn } = useContext(UserContext);
  const [isCompleted, setIsCompleted] = useState(false);
  const { authorName } = GetAuthorName();

  return (
    <div className='header'>
      <div style={{ position: "relative" }}>
        <Link to='/'>WebDev Blog🔥🚀</Link>

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
      <div>
        {isSignIn && (
          <div style={{ display: "flex" }}>
            <Link style={{ borderRadius: "100%", width: "50px", height: "50px" }} to='profile'>
              <img
                style={{
                  height: "100%",
                  borderRadius: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                src='https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'
                alt='profile-pic'
              />
            </Link>
            <button className='logout-btn' onClick={() => setIsCompleted((prev) => !prev)}>
              <MdLogout />
            </button>
          </div>
        )}
        {!isSignIn && <Link to='/account/login'>Login</Link>}
      </div>

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

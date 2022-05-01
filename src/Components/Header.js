import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/authContext";
import PorfileDropDown from "./PorfileDropDown";
import GetAuthorName from "../Helper/GetAuthorName";
import { auth } from "../firebaseConfig";
import { MdLogout } from "react-icons/md";
import "../index.css";

function Header() {
  const { isSignIn } = useContext(UserContext);
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
      <div>
        {isSignIn && (
          <div
            style={{
              display: "flex",
              position: "relative",
              borderRadius: "100%",
              width: "50px",
              height: "50px",
              cursor: "pointer",
            }}
          >
            <img
              style={{
                height: "100%",
                borderRadius: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
              alt="profile-pic"
            />
            <PorfileDropDown />
          </div>
        )}
        {!isSignIn && <Link to="/account/login">Login</Link>}
      </div>
    </div>
  );
}

export default Header;

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { UserContext } from "../Context/AuthContext";
import PorfileDropDown from "./PorfileDropDown";
import { auth, db } from "../firebaseConfig";
import { ThemeContext } from "../Context/ThemeContext";
import "../index.css";
import defaultImage from "../Assets/default_profile_picture.png";

function Header({ imageURL, setImageURL }) {
  const { isSignIn } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (isSignIn.uid !== undefined) {
      onSnapshot(doc(db, "users", auth.currentUser?.uid), (doc) => {
        setUserName(doc.data());
        setImageURL(doc.data()?.image);
      });
    } else {
      setUserName("");
    }
  }, [isSignIn]);

  return (
    <div
      className={`header bg-${
        theme === "dark" ? "light" : "rgba(248,249,250)"
      }  `}
    >
      <div className="inner-header">
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
            height: "100%",
            color: `${theme === "dark" ? "black" : "#fff"}`,
          }}
        >
          <Link
            style={{
              textAlign: "left",
              color: `${theme === "dark" ? "black" : "#fff"}`,
            }}
            to="/"
          >
            WebDev Blog🚀
          </Link>

          <span style={{ marginLeft: "13px" }}>
            {userName?.username ? `@ ${userName?.username.slice(0, 30)}` : ""}
          </span>
        </div>
        <div>
          {isSignIn && (
            <div
              className="profile-header"
              style={{
                position: "relative",
                width: "68px",
                height: "68px",
                cursor: "pointer",
              }}
            >
              <img
                className="profile-img"
                onClick={() => setShowProfile(!showProfile)}
                style={{
                  height: "100%",
                  maxWidth: "100%",
                  borderRadius: "100%",
                  objectFit: "cover",
                  border: `3px solid ${theme === "dark" ? "#444" : "#fff"}`,
                }}
                src={imageURL || defaultImage}
                alt={auth.currentUser.displayName}
              />

              {showProfile && (
                <PorfileDropDown setShowProfile={setShowProfile} />
              )}
            </div>
          )}
          {!isSignIn && <Link to="/account/login">Login</Link>}
        </div>
      </div>
    </div>
  );
}

export default Header;

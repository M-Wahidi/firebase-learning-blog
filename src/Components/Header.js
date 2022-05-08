import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { UserContext } from "../Context/authContext";
import PorfileDropDown from "./PorfileDropDown";
import { auth, db } from "../firebaseConfig";
import "../index.css";

function Header({ imageURL, setImageURL }) {
  const { isSignIn } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setImageURL(auth.currentUser?.photoURL);
    if (isSignIn.uid !== undefined) {
      onSnapshot(doc(db, "users", auth.currentUser?.uid), (doc) => {
        setUserName(doc.data());
      });
    } else {
      setUserName("");
    }
  }, [isSignIn]);

  return (
    <div className="header">
      <div className="inner-header">
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
            color: "#fff",
            height: "100%",
          }}
        >
          <Link style={{ textAlign: "left" }} to="/">
            WebDev Blog🔥🚀
          </Link>

          <span style={{ marginLeft: "13px" }}>
            {userName.username ? `@ ${userName?.username.slice(0, 30)}` : ""}
          </span>
        </div>
        <div>
          {isSignIn && (
            <div
              style={{
                position: "relative",
                width: "60px",
                height: "60px",
                cursor: "pointer",
              }}
            >
              <img
                onClick={() => setShowProfile(!showProfile)}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #fff",
                }}
                src={
                  imageURL ||
                  "https://bootdey.com/img/Content/avatar/avatar7.png"
                }
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

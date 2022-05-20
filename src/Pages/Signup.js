import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, addUser } from "../firebaseConfig";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Notification from "../Components/Notification";
import Loading from "../Components/Loading";
import { MdRemoveRedEye } from "react-icons/md";
import checkPath from "../Helper/checkPath";
import defaultImage from "../Assets/default_profile_picture.png";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypepassowrd, setRetypePassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleSingupUserandPass = (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) return;

    setIsLoading(true);
    if (retypepassowrd !== password) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      setTimeout(() => {
        setError(true);
      }, 600);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          localStorage.setItem("auth", true);
          addUser(fullName, email, user.uid, "", "");
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: defaultImage,
          });
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
          setTimeout(() => {
            setCompleted(true);
          }, 600);
          setTimeout(() => {
            setCompleted(true);
          }, 1600);

          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        setTimeout(() => {
          setError(error.message);
        }, 600);
        setTimeout(() => {
          setError(false);
        }, 2000);
        return;
      });
  };

  useEffect(() => {
    if (checkPath(location)) {
      navigate("/");
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <form id="singup-box">
        <div className="sing-up-container" style={{ left: "25%" }}>
          <h1>Sign up</h1>
          <input
            type="text"
            name="fullname"
            autoComplete="fullname"
            value={fullName}
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            name="email"
            autoComplete="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ display: "flex", position: "relative" }}>
            <input
              type={passwordType}
              name="password"
              value={password}
              placeholder="Password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", position: "relative" }}>
            <input
              type={passwordType}
              name="password2"
              placeholder="Retype password"
              autoComplete="new-password"
              onChange={(e) => setRetypePassword(e.target.value)}
              value={retypepassowrd}
            />
            <div
              style={{
                position: "absolute",
                right: ".5rem",
                top: "5px",
                cursor: "pointer",
              }}
              onClick={() =>
                setPasswordType((prev) =>
                  prev === "password" ? "text" : "password"
                )
              }
            >
              <MdRemoveRedEye />
            </div>
          </div>
          <input
            type="submit"
            name="signup_submit"
            value="Sign me up"
            onClick={handleSingupUserandPass}
          />
          <div className="login-link">
            You have account? <Link to="/account/login">Log in</Link>
          </div>
        </div>
        <Notification
          opition={{
            title:
              retypepassowrd !== password || error
                ? "Error"
                : completed
                ? "Add User"
                : "",
            message:
              retypepassowrd !== password
                ? "Password Not Match"
                : error
                ? error
                : completed
                ? `User ${fullName} is scucssfuly added`
                : "",
          }}
          completed={completed}
          error={error}
        />
      </form>
      {isLoading && <Loading />}
    </div>
  );
}

export default Signup;

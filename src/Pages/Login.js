import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { addUser, db, auth } from "../firebaseConfig";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Notification from "../Components/Notification";
import Loading from "../Components/Loading";
import { MdRemoveRedEye } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import checkPath from "../Helper/checkPath";
import Button from "react-bootstrap/Button";
import { getDoc, doc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleLoginUser = (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) return;
    setCompleted(false);
    setError(false);
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          setCompleted(true);
        }, 1000);
        setTimeout(() => {
          setCompleted(false);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          setError(error.message);
        }, 1000);
        setTimeout(() => {
          setError("");
        }, 2500);
      });
  };

  const handleSingWithGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const { displayName, email, uid } = result.user;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      addUser(displayName, email, uid);
    }

    localStorage.setItem("auth", true);
    updateProfile(auth.currentUser, {
      displayName,
    });
    navigate("/");
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <form id="login-box">
        <div style={loginStyles}>
          <h1>Log In</h1>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            autoComplete="currnet-email"
          />
          <div style={{ display: "flex", position: "relative" }}>
            <input
              type={passwordType}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="currnet-password"
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

          <Link
            style={{
              fontSize: "12px",
              textAlign: "right",
              width: "220px",
              position: "relative",
              bottom: "15px",
              userSelect: "none",
            }}
            to="/account/reset-password"
          >
            FORGOT PASSWORD?
          </Link>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <input
              type="submit"
              name="signup_submit"
              value="Login"
              onClick={handleLoginUser}
            />
            <h3 style={{ marginTop: "18px" }}>|</h3>
            <Button
              variant="outline-dark"
              style={{
                height: "32px",
                width: "120px",
                marginTop: "8px",
                borderRadius: "2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: ".2rem",
              }}
              onClick={handleSingWithGoogle}
            >
              Sign With
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FcGoogle />
              </span>
            </Button>
          </div>

          <div className="singup-link">
            Don't have an account? <Link to="/account/signup">sign up</Link>
          </div>
        </div>
      </form>

      <Notification
        opition={{
          title: error ? "Error" : "",
          message: error ? error : completed ? `singed in successfully` : "",
        }}
        completed={completed}
        error={error}
      />
      {isLoading && <Loading />}
    </div>
  );
}

const loginStyles = {
  display: "flex",
  flexDirection: "column",
  justifyItems: "center",
  alignItems: "center",
  position: "relative",
  top: "50%",
  transform: "translateY(-50%)",
};

export default Login;

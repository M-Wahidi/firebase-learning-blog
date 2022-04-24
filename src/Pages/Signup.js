import { useState, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, addUser } from "../firebaseConfig";
import { UserContext } from "../Context/authContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Notification from "../Components/Notification";
import Loading from "../Components/Loading";
import { MdRemoveRedEye } from "react-icons/md";
import checkPath from "../Helper/checkPath";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypepassowrd, setRetypePassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const { setIsSignIn } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleSingupUserandPass = (e) => {
    e.preventDefault();
    if (retypepassowrd !== password) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    setCompleted(false);
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setIsSignIn(true);
          localStorage.setItem("auth", true);
          addUser(userName, email, user.uid);
          setCompleted(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);

          setTimeout(() => {
            setCompleted(true);
          }, 600);

          setTimeout(() => {
            setCompleted(false);
          }, 1400);

          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch((error) => {
        setError(error.message);
        setTimeout(() => {
          setError("");
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
    <>
      <form id='singup-box'>
        <div className='sing-up-container' style={{ left: "25%" }}>
          <h1>Sign up</h1>
          <input
            type='text'
            name='username'
            autoComplete='username'
            value={userName}
            placeholder='Username'
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type='text'
            name='email'
            autoComplete='email'
            value={email}
            placeholder='E-mail'
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ display: "flex", position: "relative" }}>
            <input
              type={passwordType}
              name='password'
              value={password}
              placeholder='Password'
              autoComplete='new-password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", position: "relative" }}>
            <input
              type={passwordType}
              name='password2'
              placeholder='Retype password'
              autoComplete='new-password'
              onChange={(e) => setRetypePassword(e.target.value)}
              value={retypepassowrd}
            />
            <div
              style={{ position: "absolute", right: ".5rem", top: "5px", cursor: "pointer" }}
              onClick={() => setPasswordType((prev) => (prev === "password" ? "text" : "password"))}
            >
              <MdRemoveRedEye />
            </div>
          </div>
          <input type='submit' name='signup_submit' value='Sign me up' onClick={handleSingupUserandPass} />
          <div className='login-link'>
            You have account? <Link to='/account/login'>Log in</Link>
          </div>
        </div>
        <Notification
          opition={{
            title: retypepassowrd !== password || error ? "Error" : completed ? "Add User" : "",
            message:
              retypepassowrd !== password
                ? "Passwor Not Match"
                : error
                ? error
                : completed
                ? `User ${userName} is scucssfuly added`
                : "",
          }}
          completed={completed}
          error={error}
        />
      </form>
      {isLoading && <Loading />}
    </>
  );
}

export default Signup;

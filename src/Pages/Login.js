import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Notification from "../Components/Notification";
import Loading from "../Components/Loading";
import { MdRemoveRedEye } from "react-icons/md";
import checkPath from '../Helper/checkPath'
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const location = useLocation().pathname

  const handleLoginUser = (e) => {
    e.preventDefault();

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
          navigate('/')
        }, 2500);
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

  useEffect(() =>{
    if(checkPath(location)){
      navigate('/')
    }
  },[])

  return (
    <>
      <form id='login-box'>
        <div style={loginStyles}>
          <h1>Log In</h1>
          <input
            type='text'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='E-mail'
            autoComplete='currnet-email'
          />
          <div style={{ display: "flex", position: "relative" }}>
            <input
              type={passwordType}
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              autoComplete='currnet-password'
            />
            <div
              style={{ position: "absolute", right: ".5rem", top: "5px", cursor: "pointer" }}
              onClick={() => setPasswordType((prev) => (prev === "password" ? "text" : "password"))}
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
            to='/account/reset-password'
          >
            FORGOT PASSWORD?
          </Link>
          <input type='submit' name='signup_submit' value='Login' onClick={handleLoginUser} />
          <div className='singup-link'>
            Don't have an account? <Link to='/account/signup'>sign up</Link>
          </div>
        </div>
      </form>
      <Notification
        opition={{
          title: error ? "Error" : "",
          message: error ? error : completed ? `User Wiht Email ${email} singed in successfully` : "",
        }}
        completed={completed}
        error={error}
      />
      {isLoading && <Loading />}
    </>
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

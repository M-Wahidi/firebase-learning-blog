import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, addUser } from "../firebaseConfig";
import { UserContext } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import Notification from "../Components/Notification";
import Loading from "../Components/Loading";
import { MdRemoveRedEye } from "react-icons/md";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypepassowrd, setRetypePassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { setIsSignIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSingupUserandPass = (e) => {
    e.preventDefault();
    if (retypepassowrd !== password) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setIsSignIn(true);
          localStorage.setItem("auth", true);
          addUser(userName, email, user.uid);
          setCompleted(true);
          setTimeout(() => {
            navigate("/");
          }, 2500);
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

  return (
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
        <div>
        <input
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          autoComplete='new-password'
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
       <div>
       <input
          type='password'
          name='password2'
          placeholder='Retype password'
          autoComplete='new-password'
          onChange={(e) => setRetypePassword(e.target.value)}
          value={retypepassowrd}
        />
       </div>
     
        <input type='submit' name='signup_submit' value='Sign me up' onClick={handleSingupUserandPass} />
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
  );
}

export default Signup;

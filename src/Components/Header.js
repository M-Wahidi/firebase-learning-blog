import "../index.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/authContext";
import Notification from "./Notification";

function Header() {
  const { isSignIn, setIsSignIn } = useContext(UserContext);
  const [isCompleted, setIsCompleted] = useState(false);


  useEffect(() => {
    setIsSignIn(JSON.parse(localStorage.getItem("auth")));
  }, []);

  return (
    <div className='header'>
      <Link to='/'>WebDev Blog 😀</Link>
      {isSignIn && <Link to='create-post'>Create Blog</Link>}

      {isSignIn && <Link to={`user-blogs`}>My Blogs</Link>}

      {isSignIn ? (
        <Link to='/' onClick={() => setIsCompleted(prev => !prev)} >
          Logout
        </Link>
      ) : (
        <Link to='/account/login'>Login</Link>
      )}
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

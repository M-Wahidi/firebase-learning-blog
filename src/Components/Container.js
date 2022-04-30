import { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import CreateBlog from "../Pages/CreateBlog";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import ProtectedRoutes from "../ProtectedRoutes";
import ResetPassword from "../Pages/ResetPassword";
import { UserContext } from "../Context/authContext";
import Loading from "./Loading";
import Profile from "../Pages/Profile";

function Container() {
  const [loading, setLoading] = useState(false);
  const { isSignIn } = useContext(UserContext);
  useEffect(() => {
    if (isSignIn === "") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isSignIn]);

  return (
    <Router>
      <div className='App'>
        {loading ? <Loading /> : <Header />}
        <Routes>
          <Route path='/' element={<Home />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='create-post' element={<CreateBlog />} />
            <Route path='profile' element={<Profile />} />
          </Route>

          <Route path='account'>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='reset-password' element={<ResetPassword />} />
          </Route>

          <Route
            path='*'
            element={<h1 style={{ textAlign: "center", paddingTop: "20px" }}>There's nothing here: 404!</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default Container;

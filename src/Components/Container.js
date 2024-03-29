import { useState, useContext, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import CreateBlog from "../Pages/CreateBlog";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import ProtectedRoutes from "../ProtectedRoutes";
import ResetPassword from "../Pages/ResetPassword";
import { UserContext } from "../Context/AuthContext";
import Loading from "./Loading";
import Profile from "../Pages/Profile";
import BlogDetails from "../Pages/BlogDetails";
import ProfileView from "./ProfileView";
function Container() {
  const [loading, setLoading] = useState(false);
  const { isSignIn } = useContext(UserContext);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (isSignIn === "") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isSignIn]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Header imageURL={imageURL} setImageURL={setImageURL} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:name/:id" element={<BlogDetails />} />
        <Route path="/profile/:name/:id" element={<ProfileView />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="create-blog" element={<CreateBlog />} />
          <Route
            path="profile"
            element={<Profile imageURL={imageURL} setImageURL={setImageURL} />}
          />
        </Route>

        <Route path="account">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center", paddingTop: "20px" }}>
              There's nothing here: 404!
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default Container;

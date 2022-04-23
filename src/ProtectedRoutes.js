import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import {UserContext} from './Context/authContext'
import Home from "./Pages/Home";

function ProtectedRoutes() {
  const {isSignIn} = useContext(UserContext)
  return isSignIn ? <Outlet /> : <Home /> && <Navigate to='/' />;
}

export default ProtectedRoutes;

import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./firebaseConfig";

import React from "react";
import Home from "./Pages/Home";

function ProtectedRoutes() {
  return auth.currentUser ? <Outlet /> : <Home /> && <Navigate to='/' />;
}

export default ProtectedRoutes;

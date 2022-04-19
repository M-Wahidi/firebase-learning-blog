import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import CreateBlog from "./Pages/CreateBlog";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SingUp from "./Pages/Signup";
import { UserProvider } from "./Context/authContext";
import ProtectedRoutes from "./ProtectedRoutes";
import UserBlog from "./Pages/UserBlog";
import ResetPassword from "./Components/ResetPassword";
function App() {
  return (
    <Router>
      <UserProvider>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='create-post' element={<CreateBlog />}></Route>
              <Route path='user-blogs' element={<UserBlog />}></Route>
            </Route>
            <Route path="account" />
              <Route path='account/login' element={<Login />} />
              <Route path="account/reset-password" element={<ResetPassword />} />
            < Route />
            <Route path='singup' element={<SingUp />} />

            <Route
              path='*'
              element={<h1 style={{ textAlign: "center", paddingTop: "20px" }}>There's nothing here: 404!</h1>}
            />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MdLogout, MdDarkMode, MdLightMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { ThemeContext } from "../Context/ThemeContext";
import Notification from "./Notification";

function PorfileDropDown({ setShowProfile }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { setTheme, theme } = useContext(ThemeContext);
  const handleLogout = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <div
      className="profile-container"
      style={{
        backgroundColor: `${theme === "dark" ? "rgba(248,249,250)" : "#333"}`,
        top: "70px",
        width: "150px",
        height: "150px",
        right: "0",
        position: "absolute",
        zIndex: 4,
        listStyle: "none",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <li style={{ cursor: "pointer" }} onClick={() => setShowProfile(false)}>
        <Link
          to="profile"
          style={{ color: `${theme === "dark" ? "#333" : "#fff"}` }}
        >
          <CgProfile />
        </Link>
      </li>

      <button
        onClick={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
        style={{
          textAlign: "center",
          border: "none",
          fontSize: "1.6rem",
          background: "none",
          color: `${theme === "dark" ? "#333" : "#fff"}`,
        }}
      >
        {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
      </button>

      <li
        style={{
          textAlign: "center",
          color: `${theme === "dark" ? "#333" : "#fff"}`,
        }}
        className="logout-btn"
        onClick={handleLogout}
      >
        <MdLogout />
      </li>

      <Notification
        setShowProfile={setShowProfile}
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

export default PorfileDropDown;

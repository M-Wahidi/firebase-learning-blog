import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdLogout, MdDarkMode, MdLightMode } from "react-icons/md";
import Notification from "./Notification";

function PorfileDropDown({ setShowProfile }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleLogout = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <div
      className='profile-dropdown'
      style={{
        backgroundColor: "#333",
        top: "70px",
        width: "150px",
        height: "150px",
        right: "0",
        position: "absolute",
        fontSize: "1rem",
        zIndex: 4,
        listStyle: "none",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <li style={{ cursor: "pointer" }} onClick={() => setShowProfile(false)}>
        <Link to='profile'>Profile</Link>
      </li>

      <li
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <li style={{ textAlign: "center" }} className='logout-btn' onClick={handleLogout}>
          <MdLogout />
        </li>
      </li>

      <button
        style={{
          textAlign: "center",
          border: "none",
          color: "#fff",
          background: "#333",
          fontSize: "1.6rem",
        }}
      >
        <MdDarkMode />
      </button>
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

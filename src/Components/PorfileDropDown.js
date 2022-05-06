import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import Notification from "./Notification";

function PorfileDropDown({ setShowProfile }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleLogout = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <div
      style={{
        backgroundColor: "#333",
        top: "65px",
        width: "150px",
        height: "120px",
        right: "0",
        position: "absolute",
        fontSize: "1rem",
        zIndex: 4,
        listStyle: "none",
      }}
    >
      <li
        style={{ cursor: "pointer", height: "30px", marginBottom: "20px" }}
        onClick={() => setShowProfile(false)}
      >
        <Link to="profile">Profile</Link>
      </li>
      <li
        style={{
          cursor: "pointer",
          height: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          style={{ textAlign: "center" }}
          className="logout-btn"
          onClick={handleLogout}
        >
          <MdLogout />
        </button>
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

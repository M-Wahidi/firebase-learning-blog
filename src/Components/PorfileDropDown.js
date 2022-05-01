import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import Notification from "./Notification";

function PorfileDropDown() {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#333",
        top: "60px",
        left: "-55px",
        position: "absolute",
        fontSize: "1.2rem",
        zIndex: 4,
        padding: ".5rem",
      }}
    >
      <div
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "150px",
          height: "80px",
          gap: "1rem",
        }}
      >
        <li style={{ cursor: "pointer" }}>
          <Link to="profile"> Profile </Link>
        </li>
        <li style={{ cursor: "pointer" }}>
          <button
            className="logout-btn"
            onClick={() => setIsCompleted((prev) => !prev)}
          >
            <MdLogout />
          </button>
        </li>
      </div>

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

export default PorfileDropDown;

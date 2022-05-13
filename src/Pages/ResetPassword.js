import { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Notification from "../Components/Notification";
import { useLocation, useNavigate } from "react-router-dom";
import checkPath from "../Helper/checkPath";
import Loading from "../Components/Loading";
function ResetPassword() {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleResetPassword = (e) => {
    e.preventDefault();
    const auth = getAuth();
    setCompleted(false);
    setError(false);
    setIsLoading(true);

    sendPasswordResetEmail(auth, newEmail)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          setCompleted(true);
        }, 1000);
        setTimeout(() => {
          setCompleted(false);
        }, 2500);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          setError(error.message);
        }, 1000);
        setTimeout(() => {
          setError("");
        }, 2500);
      });
    setNewEmail("");
  };

  useEffect(() => {
    if (checkPath(location)) {
      navigate("/");
    }
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <form
        style={containerStyle}
        onSubmit={handleResetPassword}
        id="reset-box"
      >
        <h3>FORGOT PASSWORD</h3>
        <input
          type="text"
          onChange={(e) => setNewEmail(e.target.value)}
          value={newEmail}
          placeholder="Email..."
        />
        <button
          onClick={handleResetPassword}
          style={{
            backgroundColor: "#16a085",
            color: "#fff",
            padding: "5px 30px",
            border: "none",
          }}
        >
          Send
        </button>
      </form>
      <Notification
        opition={{
          title: error ? "Error" : "",
          message: error
            ? error
            : completed
            ? `Password reset email sent!`
            : "",
        }}
        completed={completed}
        error={error}
      />
      {isLoading && <Loading />}
    </div>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  margin: "1rem",
  gap: "1.5rem",
  padding: "1rem ",
  width: "600px",
  backgroundColor: "#fff",
};

export default ResetPassword;

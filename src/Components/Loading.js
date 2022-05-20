import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div style={blurBackground}>
      <ReactLoading type={"spin"} color="#fff" />
    </div>
  );
}

const blurBackground = {
  backgroundColor: "rgba(56, 56, 56 ,0.7)",
  position: "fixed",
  left: "0",
  top: "0",
  height: "100vh",
  width: "100vw",
  zIndex: "99",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default Loading;

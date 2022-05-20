import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

function ReplyComment({
  replyIWriterID,
  replyInput,
  replyWriterName,
  replyWriterProfilePic,
  createdAt,
  authorID,
}) {
  return (
    <div
      className="media my-2 row-line reply-comment-cotainer"
      style={{
        backgroundColor: "rgb(243, 243, 243)",
        marginLeft: "4rem",
        padding: "1rem",
      }}
    >
      <Link to={`/profile/${replyWriterName}/${replyIWriterID}`}>
        <img
          className="mr-3 mb-1 rounded-circle "
          src={replyWriterProfilePic}
          alt="user__image"
          style={{ objectFit: "cover" }}
        />
      </Link>
      {replyIWriterID === authorID && (
        <small
          style={{
            textAlign: "center",
            padding: "0.2rem",
            background: "#333",
            color: "#fff",
            marginLeft: ".5rem",
            borderRadius: "5px",
          }}
        >
          Author
        </small>
      )}

      <div className="media-body">
        <div className="row">
          <div className="col-12 d-flex">
            <div
              style={{
                fontSize: "13px",
                color: "darkblue",
                marginBottom: ".5rem",
              }}
            >
              {replyWriterName}{" "}
            </div>
            <div style={{ fontSize: "13px", color: "#333" }} className="px-2">
              <ReactTimeAgo
                date={new Date(createdAt.seconds * 1000)}
                locale="en-US"
                timeStyle="round-minute"
              />
            </div>
          </div>
        </div>
        <div style={{ fontSize: "13px", color: "#333" }}>{replyInput}</div>
      </div>
    </div>
  );
}

export default ReplyComment;

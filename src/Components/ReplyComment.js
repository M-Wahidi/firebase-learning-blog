import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

function ReplyComment({ replyIWriterID, replyInput, replyWriterName, replyWriterProfilePic, createdAt }) {
  return (
    <div className='media my-2 mx-5'>
      <Link to={`/profile/${replyWriterName}/${replyIWriterID}`}>
        <img
          className='mr-3 mb-1 rounded-circle'
          src={replyWriterProfilePic}
          alt='user__image'
          style={{ objectFit: "cover" }}
        />
      </Link>
      <div className='media-body'>
        <div className='row'>
          <div className='col-12 d-flex'>
            <div style={{ fontSize: "13px" }}>{replyWriterName} </div>
            <div style={{ fontSize: "13px" }} className='px-1'>
              - <ReactTimeAgo date={new Date(createdAt.seconds * 1000)} locale='en-US' timeStyle='round-minute' />
            </div>
          </div>
        </div>
        {replyInput}
      </div>
    </div>
  );
}

export default ReplyComment;

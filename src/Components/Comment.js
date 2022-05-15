import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import ReplyComment from "./ReplyComment";
import { Form } from "react-bootstrap";
const Comment = ({
  commentId,
  commentInput,
  commentWriterName,
  commentWriterID,
  createdAt,
  replies,
  commentWriterProfilePic,
}) => {
  const [showReplay, setgShowReply] = useState(false);
  const [replyInput, setReplyInput] = useState("");

  const handleCommentReply = (e) => {
    e.preventDefault();
    console.log("gg");
  };
  return (
    <div className='media my-2'>
      <Link to={`/profile/${commentWriterName}/${commentWriterID}`}>
        <img
          className='mr-3 mb-1 rounded-circle'
          src={commentWriterProfilePic}
          alt='user__image'
          style={{ objectFit: "cover" }}
        />
      </Link>
      <div className='media-body'>
        <div className='row'>
          <div className='col-10 d-flex'>
            <div style={{ fontSize: "13px" }}>{commentWriterName} </div>
            <div style={{ fontSize: "13px" }} className='px-1'>
              - <ReactTimeAgo date={new Date(createdAt.seconds * 1000)} locale='en-US' timeStyle='round-minute' />
            </div>
          </div>

          <div className='col-2'>
            <div className='pull-right reply'>
              <button
                style={{ border: "none", backgroundColor: "transparent", color: "#204278" }}
                onClick={() => setgShowReply((prev) => !prev)}
              >
                <small>
                  <i className='fa fa-reply'></i> Reply
                </small>
              </button>
            </div>
          </div>
        </div>
        {commentInput}
      </div>
      {showReplay && (
        <Form onSubmit={handleCommentReply}>
          <Form.Control
            className='container mb-5'
            type='text'
            onChange={(e) => setReplyInput(e.target.value)}
            value={replyInput}
          />
        </Form>
      )}
      <ReplyComment />
    </div>
  );
};

export default Comment;

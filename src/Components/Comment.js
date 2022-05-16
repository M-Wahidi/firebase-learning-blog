import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import ReplyComment from "./ReplyComment";
import { Form } from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { v4 } from "uuid";

const Comment = ({
  commentID,
  commentInput,
  commentWriterName,
  commentWriterID,
  createdAt,
  commentWriterProfilePic,
  id,
  comments,
  replies,
}) => {
  const [showReplay, setgShowReply] = useState(false);
  const [replyInput, setReplyInput] = useState("");

  const handleReply = (id, newReply) => {
    let targetComment = comments.find((comment) => comment.commentID === id);
    let repliesData = { ...targetComment, replies: [newReply, ...targetComment.replies] };
    const filterComments = comments.filter((comment) => comment.commentID !== id);
    return [repliesData, ...filterComments];
  };

  const handleCommentReply = async (e) => {
    e.preventDefault();
    const replyObj = {
      commentID: v4(),
      replyInput,
      replyIWriterID: auth.currentUser.uid,
      replyWriterName: auth.currentUser.displayName,
      replyWriterProfilePic: auth.currentUser.photoURL,
      createdAt: new Date(),
    };
    const blogsRef = doc(db, "blogs", id);
    const comments = handleReply(commentID, replyObj);

    setDoc(
      blogsRef,
      {
        comments,
      },
      { merge: true }
    );
    setReplyInput("");
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
            className='container mb-5 px-2'
            type='text'
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            placeholder={`Reply To @${auth.currentUser.uid === commentWriterID ? "Yourself" : commentWriterName}`}
          />
        </Form>
      )}
      {replies && replies.map((reply, key) => <ReplyComment key={key} {...reply} />)}
    </div>
  );
};

export default Comment;

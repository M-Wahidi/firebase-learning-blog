import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import ReplyComment from "./ReplyComment";
import { Form } from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { v4 } from "uuid";
import { BsFillReplyFill } from "react-icons/bs";
const Comment = ({
  commentID,
  commentInput,
  commentWriterName,
  commentWriterID,
  createdAt,
  commentWriterProfilePic,
  id,
  authorID,
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
    <div className={`media my-2 ${replies.length > 0 && "line"}`}>
      <Link to={`/profile/${commentWriterName}/${commentWriterID}`}>
        <img
          className='mr-3 mb-1 rounded-circle'
          src={commentWriterProfilePic}
          alt='user__image'
          style={{ objectFit: "cover" }}
        />
      </Link>
      {commentWriterID === authorID && (
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

      <div className='mx-4 init-comment'>
        <div className='row mr-2 '>
          <div className='col-12 d-flex align-items-center '>
            <div style={{ fontSize: "14px", color: "darkblue" }}>{commentWriterName} </div>
            <div style={{ fontSize: "14px", paddingLeft: ".5rem" }}>
              <ReactTimeAgo date={new Date(createdAt.seconds * 1000)} locale='en-US' timeStyle='round-minute' />
            </div>
            {auth.currentUser && (
              <button
                style={{ border: "none", backgroundColor: "transparent", color: "#204278" }}
                onClick={() => setgShowReply((prev) => !prev)}
              >
                <div style={{ fontSize: "1.2rem", marginLeft: ".5rem" }}>
                  <BsFillReplyFill />
                </div>
              </button>
            )}
          </div>
        </div>
        {commentInput}
      </div>
      {showReplay && (
        <Form onSubmit={handleCommentReply} className=' w-90 mx-5'>
          <Form.Control
            className='container mb-5 mx-3 px-2 '
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

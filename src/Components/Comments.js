import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Comment from "./Comment";
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { v4 } from "uuid";
import sortComments from "../Helper/sortComments";

const Comments = ({ id, authorID }) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setCommnets] = useState([]);
  const [profilePic, setProfilePic] = useState(auth.currentUser?.photoURL);

  const getAllComments = () => {
    onSnapshot(doc(db, "blogs", id), (doc) => {
      const comments = doc.data().comments;
      const sortedComments = comments.sort(sortComments);
      setCommnets(sortedComments);
    });
  };

  const checkUpateProfilePic = () => {
    if (!auth.currentUser) return;
    onSnapshot(doc(db, "users", auth.currentUser?.uid), (doc) => {
      setProfilePic(doc.data().photoURL || auth.currentUser.photoURL);
      getAllComments();
    });
  };

  useEffect(() => {
    getAllComments();
    checkUpateProfilePic();
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    checkUpateProfilePic();
    const commentObj = {
      commentID: v4(),
      commentInput,
      commentWriterID: auth.currentUser.uid,
      commentWriterName: auth.currentUser.displayName,
      commentWriterProfilePic: profilePic,
      replies: [],
      createdAt: new Date(),
    };
    const commentData = [...comments, commentObj];
    const docRef = doc(db, "blogs", id);

    setDoc(
      docRef,
      {
        comments: commentData,
      },
      { merge: true }
    );
    setCommentInput("");
  };

  return (
    <div className=" comments">
      <div className=" card">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center mb-5 text-dark">Comments</h3>
            <div className="row">
              {auth.currentUser && (
                <Form onSubmit={handleComment}>
                  <Form.Control
                    className="container mb-5 px-2"
                    type="text"
                    placeholder="Add Comment..."
                    onChange={(e) => setCommentInput(e.target.value)}
                    value={commentInput}
                  />
                </Form>
              )}
              <div className="col-md-12">
                {comments.map((comment, key) => (
                  <Comment
                    key={key}
                    {...comment}
                    id={id}
                    comments={comments}
                    authorID={authorID}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

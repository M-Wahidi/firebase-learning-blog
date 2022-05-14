import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Comment from "./Comment";
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { v4 } from "uuid";

const Comments = ({ id }) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setCommnets] = useState([]);

  const getAllComments = () => {
    onSnapshot(doc(db, "blogs", id), (doc) => {
      setCommnets(doc.data().comments);
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  useEffect(() => {
    addComment();
  }, [comments]);

  const handleComment = async (e) => {
    e.preventDefault();
    const commentObj = {
      commentID: v4(),
      commentInput,
      commentWriterID: auth.currentUser.displayName,
      replies: [],
      createdAt: new Date(),
    };
    setCommnets((prev) => [...prev, commentObj]);
    addComment();
    setCommentInput("");
  };

  const addComment = async () => {
    const docRef = doc(db, "blogs", id);
    setDoc(
      docRef,
      {
        comments,
      },
      { merge: true }
    );
  };

  return (
    <div className=' comments'>
      <div className=' card'>
        <div className='row'>
          <div className='col-md-12'>
            <h3 className='text-center mb-5'>Comments</h3>
            <div className='row'>
              <Form onSubmit={handleComment}>
                <Form.Control
                  className='container mb-5'
                  type='text'
                  placeholder='Add Comment...'
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                />
              </Form>
              <div className='col-md-12'>
                <Comment {...comments} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

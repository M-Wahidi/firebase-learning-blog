import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const Comment = ({
  commentId,
  commentInput,
  commentWriterName,
  commentWriterID,
  createdAt,
  replies,
  commentWriterProfilePic,
}) => {
  return (
    <div className="media my-2">
      <img
        className="mr-3 mb-1 rounded-circle"
        alt="ProfilePic"
        src={commentWriterProfilePic}
        style={{ objectFit: "cover" }}
      />
      <div className="media-body">
        <div className="row">
          <div className="col-9 d-flex">
            <h6>{commentWriterName} </h6>
            <small className="px-1"> - 2 hr ago</small>
          </div>

          <div className="col-3">
            <div className="pull-right reply">
              <Link to="#">
                <span>
                  <i className="fa fa-reply"></i> reply
                </span>
              </Link>
            </div>
          </div>
        </div>
        {commentInput}
      </div>
    </div>
    // <ReactTimeAgo date={Number(new Date())} locale='en-US' timeStyle='round-minute' />
  );
};

export default Comment;

import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const Comment = () => {
  return (
    <div className='media'>
      <img className='mr-3 rounded-circle' alt='Bootstrap Media Preview' src='https://i.imgur.com/stD0Q19.jpg' />
      <div className='media-body'>
        <div className='row'>
          <div className='col-9 d-flex'>
            <h6>Maria Smantha </h6>
            <small className='px-1'> - 2 hr ago</small>
          </div>

          <div className='col-3'>
            <div className='pull-right reply'>
              <Link to='#'>
                <span>
                  <i className='fa fa-reply'></i> reply
                </span>
              </Link>
            </div>
          </div>
        </div>
        It is a long established fact that a reader will be distracted by the readable content of a page.
      </div>
    </div>
    // <ReactTimeAgo date={Number(new Date())} locale='en-US' timeStyle='round-minute' />
  );
};

export default Comment;

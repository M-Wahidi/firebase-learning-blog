import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingSkeleton = ({ blogs }) => {
  return (
    <>
      {new Array(blogs.length === 0 ? 1 : blogs.length).fill(0).map((_, idx) => {
        return (
          <div
            key={idx}
            className='blog'
            style={{
              height: "570px",
              width: "360px",
              backgroundColor: "whitesmoke",
              margin: ".5rem",
              borderRadius: "10px",
            }}
          >
            <Skeleton style={skeletonStyle} count={1} height={"35%"} duration={2} borderRadius={"10px"} />
            <Skeleton style={skeletonStyle} count={1} height={"9%"} duration={2} borderRadius={"10px"} />
            <Skeleton style={skeletonStyle} count={1} height={"30%"} duration={2} borderRadius={"10px"} />
            <Skeleton style={skeletonStyle} count={1} height={"13%"} duration={2} borderRadius={"10px"} />
          </div>
        );
      })}
    </>
  );
};

export default LoadingSkeleton;

const skeletonStyle = {
  display: "block",
  backgroundColor: "#fff",
};

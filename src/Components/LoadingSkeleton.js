import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingSkeleton = () => {
  return (
    <>
      {new Array(3).fill(0).map((_, idx) => {
        return (
          <div key={idx} className='blog' style={{ height: "230px" }}>
            <Skeleton style={skeletonStyle} count={1} height={20} />
            <Skeleton style={skeletonStyle} count={1} height={80} />
            <Skeleton style={skeletonStyle} count={1} height={20} />
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

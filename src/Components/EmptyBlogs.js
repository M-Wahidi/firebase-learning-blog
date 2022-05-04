import React from "react";

function EmptyBlogs({ loading, blogs, opitions, FilterValue }) {
  return (
    <div style={{ position: "relative", top: "1.5rem" }}>
      {!loading && blogs.length === 0 && opitions === FilterValue && (
        <h1 className="blogs-message">No Blogs To Show</h1>
      )}
    </div>
  );
}

export default EmptyBlogs;

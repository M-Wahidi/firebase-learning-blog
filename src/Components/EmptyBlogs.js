import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

function EmptyBlogs({ loading, blogs, opitions, FilterValue }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ position: "relative", top: "1.5rem" }}>
      {!loading && blogs.length === 0 && opitions === FilterValue && (
        <h1
          className="blogs-message"
          style={{ color: `${theme === "dark" ? "#fff" : "#333"} ` }}
        >
          No Blogs To Show
        </h1>
      )}
    </div>
  );
}

export default EmptyBlogs;

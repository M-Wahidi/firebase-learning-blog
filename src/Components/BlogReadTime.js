import { AiOutlineClockCircle } from "react-icons/ai";
function BlogReadTime(blog) {
  return (
    <span style={{ fontSize: "1rem", display: "flex", gap: "3px", alignItems: "center" }}>
      <AiOutlineClockCircle />
      {Math.round(blog.split(" ").length / 120)}
      <small>min</small>
    </span>
  );
}

export default BlogReadTime;

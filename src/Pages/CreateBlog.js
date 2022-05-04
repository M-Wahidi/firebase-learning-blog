import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { splitTag } from "../Helper/splitTag";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Loading from "../Components/Loading";
function CreateBlog() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [tags, setTags] = useState([]);
  const [emptyTagMssage, setEmptyTagMessage] = useState("");
  const [emptyBlogTtitle, setEmptyBlogTitle] = useState("");
  const [emptyBlogBody, setEmptyBlogBody] = useState("");
  const [tagsMessage, setTagsMessgae] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState("start");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setOptions(e.target.value);
    setEmptyTagMessage("");
    if (e.target.value === "start") return;
    if (tags.length < 4) {
      if (tags.some((tag) => tag === e.target.value)) {
        return;
      }
      setTags((prev) => [...prev, e.target.value]);
      return;
    }
    setTagsMessgae(true);
  };

  const addBlog = () => {
    if (blogTitle.trim().length < 6) {
      setEmptyBlogTitle("Minmum is 6 Characters for the Blog Title");
      return;
    }
    if (blogBody.trim().length < 20) {
      setEmptyBlogBody("Minmum is 20 Characters for the Blog Body");
      return;
    }
    if (tags.length === 0) {
      setEmptyTagMessage("U need To add at least one tag");
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      setLoading(false);
      const blogRef = collection(db, "blogs");
      await addDoc(blogRef, {
        authorID: auth.currentUser.uid,
        body: blogBody,
        title: blogTitle,
        tags,
        date: new Date(),
        name: auth.currentUser.displayName,
        likesCount: 0,
        disLikesCount: 0,
        userLiked: [],
        userDisLiked: [],
        timestamp: serverTimestamp(),
      });
      navigate("/");
    }, 1500);
  };

  const handleTags = () => {
    setTags([]);
    setEmptyTagMessage("");
    setTagsMessgae("");
    setOptions("start");
  };

  const handleBlogTitleChange = (e) => {
    setBlogTitle(e.target.value);
    if (blogTitle.trim().length > 4) setEmptyBlogTitle("");
  };

  const handleBlogBodyChange = (e) => {
    setBlogBody(e.target.value);
    if (blogBody.trim().length > 18) setEmptyBlogBody("");
  };

  return (
    <div style={{ padding: " 0 2rem" }}>
      <form id="add-blog" onSubmit={(e) => e.preventDefault()}>
        <div className="add-blog-container">
          <h1>ADD BLOG</h1>

          <div className="blogTitle-form">
            <input
              type="text"
              name="blogTitle"
              autoComplete="blogTitle"
              placeholder="Blog Title"
              onChange={handleBlogTitleChange}
              value={blogTitle}
            />
            <p
              style={{
                color: "red",
                fontSize: ".8rem",
                margin: "0",
                padding: "0",
                position: "absolute",
                bottom: "-7px",
                textAlign: "center",
                width: "100%",
              }}
            >
              {emptyBlogTtitle}
            </p>
          </div>

          <div className="blogBody-form">
            <textarea
              name="blogBody"
              autoComplete="blogBody"
              placeholder="Text..."
              onChange={handleBlogBodyChange}
              value={blogBody}
            />
            <p
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                color: `${blogBody.length < 20 ? "red" : "green"}`,
              }}
            >
              {blogBody.length}
            </p>
            <p
              style={{
                color: "red",
                fontSize: ".8rem",
                margin: "0",
                padding: "0",
                position: "relative",
                bottom: "0px",
                textAlign: "center",
              }}
            >
              {emptyBlogBody}
            </p>
          </div>

          <div className="tags-input-container">
            <div style={{ display: "flex", gap: "20px", padding: "10px" }}>
              <label htmlFor="tags">Add a Tags:</label>
              <button
                style={{ width: "50px", border: "none", fontSize: "1.2rem" }}
                onClick={handleTags}
              >
                -
              </button>
            </div>
            <p
              style={{ color: "red", fontSize: ".8rem", marginBottom: "0rem" }}
            >
              {tagsMessage && "Maximum length for tags is 4"}
            </p>
            <p style={{ color: "red", fontSize: ".8rem" }}> {emptyTagMssage}</p>

            <select
              name="tags"
              id="tags"
              onChange={(e) => handleChange(e)}
              value={options}
            >
              <option value="start">Choose Tag:</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="SASS">SASS</option>
              <option value="BOOTSTRAP">BOOTSTRAP</option>
              <option value="TAILWIND">TAILWIND</option>
              <option value="JavaScript">JavaScript</option>
              <option value="REACT">REACT</option>
              <option value="Angular">Angular</option>
              <option value="VUE">VUE</option>
              <option value="NEXT JS">NEXT JS</option>
              <option value="NODE">NODE</option>
              <option value="EXPRESS">EXPRESS</option>
              <option value="REST API">REST API</option>
              <option value="PHP">PHP</option>
              <option value="PYTHON">PYTHON</option>
              <option value="UI-UX">UI-UX</option>
              <option value="FRONT-END DEVELOPMENT">
                FRONT-END DEVELOPMENT
              </option>
              <option value="EXPRESS">EXPRESS</option>
              <option value="PHP">PHP</option>
              <option value="PYTHON">PYTHON</option>
              <option value="UI-UX">UI-UX</option>
              <option value="BACK-END DEVELOPMENT">BACK-END DEVELOPMENT</option>
              <option value="GRAPH Ql">GRAPH Ql</option>
              <option value="CSS">CSS</option>
            </select>
            <div style={{ display: "flex", marginBottom: "0" }}>
              {splitTag(tags)}
            </div>
          </div>
          <input
            type="submit"
            name="AddBlog"
            value="Add Blog"
            className="addBlogBtn"
            onClick={addBlog}
            style={{
              height: "50px",
              width: "180px",
              position: "absolute",
              bottom: "30px",
            }}
          />
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
}

export default CreateBlog;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { splitTag } from "../Helper/splitTag";
import { collection, addDoc } from "firebase/firestore";

function CreateBlog() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsMessage, setTagsMessgae] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (tags.length < 4) {
      if (tags.some((tag) => tag === e.target.value)) {
        return;
      }
      setTags((prev) => [...prev, e.target.value]);
      return;
    }
    setTagsMessgae(true);
  };

  const addBlog = async () => {
    if (tags.length === 0) {
      return;
    }
    const blogRef = collection(db, "blogs");
    await addDoc(blogRef, {
      authorID: auth.currentUser.uid,
      body: blogBody,
      title: blogTitle,
      tags,
      date: new Date(),
    });
    navigate("/");
  };

  return (
    <div>
      <form id='add-blog' onSubmit={(e) => e.preventDefault()}>
        <div className='add-blog-container'>
          <h1>ADD BLOG</h1>
          <input
            type='text'
            name='blogTitle'
            autoComplete='blogTitle'
            placeholder='Blog Title'
            onChange={(e) => setBlogTitle(e.target.value)}
            value={blogTitle}
          />
          <textarea
            name='blogBody'
            autoComplete='blogBody'
            placeholder='Text...'
            onChange={(e) => setBlogBody(e.target.value)}
            value={blogBody}
          />
          <div className='tags-input-container'>
            <div style={{ display: "flex", gap: "20px", padding: "10px" }}>
              <label htmlFor='tags'>Add a Tags:</label>
              <button
                style={{ width: "50px", border: "none", fontSize: "1.2rem" }}
                onClick={() => (setTags([]), setTagsMessgae(""))}
              >
                -
              </button>
            </div>
            <p style={{ color: "red", fontSize: ".8rem" }}> {tagsMessage && "Maximum length for tags is 4"}</p>

            <select name='tags' id='tags' onChange={(e) => handleChange(e)}>
              <option value=''>Choose Tag:</option>
              <option value='HTML'>HTML</option>
              <option value='CSS'>CSS</option>
              <option value='SASS'>SASS</option>
              <option value='BOOTSTRAP'>BOOTSTRAP</option>
              <option value='TAILWIND'>TAILWIND</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='REACT'>REACT</option>
              <option value='Angular'>Angular</option>
              <option value='VUE'>VUE</option>
              <option value='NEXT JS'>NEXT JS</option>
              <option value='NODE'>NODE</option>
              <option value='EXPRESS'>EXPRESS</option>
              <option value='REST API'>REST API</option>
              <option value='PHP'>PHP</option>
              <option value='PYTHON'>PYTHON</option>
              <option value='UI-UX'>UI-UX</option>
              <option value='FRONT-END DEVELOPMENT'>FRONT-END DEVELOPMENT</option>
              <option value='EXPRESS'>EXPRESS</option>
              <option value='PHP'>PHP</option>
              <option value='PYTHON'>PYTHON</option>
              <option value='UI-UX'>UI-UX</option>
              <option value='BACK-END DEVELOPMENT'>BACK-END DEVELOPMENT</option>
              <option value='GRAPH Ql'>GRAPH Ql</option>
              <option value='CSS'>CSS</option>
            </select>
            <div style={{ display: "flex" }}>{splitTag(tags)}</div>
          </div>
          <input
            type='submit'
            name='AddBlog'
            value='Add Blog'
            className='addBlogBtn'
            onClick={addBlog}
            style={{ height: "3rem", width: "250px" }}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;

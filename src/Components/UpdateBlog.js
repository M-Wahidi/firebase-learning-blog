import { useState, useContext, useEffect } from "react";
import { db } from "../firebaseConfig";
import { EditBlogContext } from "../Context/editBlogContext";
import { splitTag } from "../Helper/splitTag";
import { collection, updateDoc, doc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import Loading from "../Components/Loading";

function UpadteBlog({ getBlogs, getUserBlogs, oldUserData }) {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsMessage, setTagsMessgae] = useState("");
  const [emptyTagMssage,setEmptyTagMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [options,setOptions] = useState('start')
  const { editBlog, setEditBlog } = useContext(EditBlogContext);
  const location = useLocation().pathname;

  const handleChange = (e) => {
    setOptions(e.target.value)
    setEmptyTagMessage('')
    if (tags.length < 4) {
      if (tags.some((tag) => tag === e.target.value)) {
        return;
      }
      setTags((prev) => [...prev, e.target.value]);
      return;
    }
    setTagsMessgae(true);
  };

  const handleCloseForm = () => {
    setEditBlog({ isEditing: false, blogId: 0 });
    setBlogTitle("");
    setBlogBody("");
    setTags([]);
    setTagsMessgae("");
  };

  const updateBlog =  () => {
    if (tags.length === 0) {
      setEmptyTagMessage('u need To add at least one tag')
      return;
    }

    setLoading(true);
    setTimeout(async() =>{
      const blogRef = collection(db, "blogs");
      const docRef = doc(blogRef, editBlog.blogId);
      await updateDoc(docRef, {
      body: blogBody,
      title: blogTitle,
      tags,
      date: new Date(),
    });
    if (location === "/") {
      getBlogs();
    } else {
      getUserBlogs();
    }
    setLoading(false);
    handleCloseForm();
    },1500)
  };

  useEffect(() => {
    if (oldUserData !== undefined) {
      setBlogTitle(oldUserData.title);
      setBlogBody(oldUserData.body);
      setTags(oldUserData.tags);
    }
  }, [oldUserData]);

  const handleTags = (e) =>{
    setTags([])
    setEmptyTagMessage('')
    setTagsMessgae('')
    setOptions('start')
  }


  return (
    <div>
      <div className='back-bg' style={{ display: `${editBlog.isEditing ? "block" : "none"}` }}></div>
      <form
        id='update-blog'
        onSubmit={(e) => e.preventDefault()}
        style={{ display: `${editBlog.isEditing ? "block" : "none"}` }}
      >
        <div className='update-blog-container'>
          <h1>EDIT BLOG</h1>
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
                onClick={handleTags}
              >
                -
              </button>
            </div>
            <p style={{ color: "red", fontSize: ".8rem",marginBottom:'0rem' }}> {tagsMessage && "Maximum length for tags is 4"}</p>
            <p style={{ color: "red", fontSize: ".8rem" }}> {emptyTagMssage}</p>

            <select name='tags' id='tags' onChange={(e) => handleChange(e)} value={options}>
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
            value='Edit Blog'
            className='addBlogBtn'
            onClick={updateBlog}
            style={{ height: "3rem", width: "250px" }}
          />
        </div>
        <button className='close-btn' onClick={handleCloseForm}>
          X
        </button>
      </form>
      {loading && <Loading />}
    </div>
  );
}

export default UpadteBlog;

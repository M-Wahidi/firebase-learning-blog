import { useState, useContext, useEffect, useRef } from "react";
import { db, auth, storage } from "../firebaseConfig";
import { EditBlogContext } from "../Context/EditBlogContext";
import { splitTag } from "../Helper/splitTag";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import resizeImage from "../Helper/resizeImage";
import { collection, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import Loading from "../Components/Loading";
import defaultBlogImage from "../Assets/default_blog_image.png";

function UpadteBlog({ oldUserData }) {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsMessage, setTagsMessgae] = useState("");
  const [emptyTagMssage, setEmptyTagMessage] = useState("");
  const [emptyBlogTtitle, setEmptyBlogTitle] = useState("");
  const [emptyBlogBody, setEmptyBlogBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState("start");
  const { editBlog, setEditBlog } = useContext(EditBlogContext);
  const [blogImage, setBlogImage] = useState("");
  const inputFile = useRef();
  const imageRandomId = uuidv4();
  const getMilliseconds = new Date().getMilliseconds();
  const IMAGE_PATH = `blogs/${auth.currentUser?.uid}/${auth.currentUser?.uid}${imageRandomId}${getMilliseconds}`;
  const path = ref(storage, IMAGE_PATH);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const uploadedImage = async () => {
    await uploadBytes(path, blogImage);
    const image = await getDownloadURL(path);
    return image;
  };

  const handleImageUpload = async (e) => {
    setLoading(true);
    const image = await resizeImage(e.target.files[0]);
    setBlogImage(image);
    setLoading(false);
  };

  const handleChange = (e) => {
    setOptions(e.target.value);
    setEmptyTagMessage("");
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
    setBlogImage("");
  };

  const updateBlog = async () => {
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
    await updateData();
  };

  const updateData = async () => {
    let image;
    if (blogImage !== "") {
      image = await uploadedImage();
    }

    const blogRef = collection(db, "blogs");
    const docRef = doc(blogRef, editBlog.blogId);
    await updateDoc(docRef, {
      body: blogBody,
      title: blogTitle,
      tags,
      date: new Date(),
      timestamp: serverTimestamp(),
      image: image || defaultBlogImage,
    });
    setLoading(false);
    handleCloseForm();
  };

  useEffect(() => {
    if (oldUserData !== undefined) {
      setBlogTitle(oldUserData.title);
      setBlogBody(oldUserData.body);
      setTags(oldUserData.tags);
    }
  }, [oldUserData]);

  const handleTags = (e) => {
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
    <div>
      <div className='back-bg' style={{ display: `${editBlog.isEditing ? "block" : "none"}` }}></div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='bg-white container-sm p-4  h-auto position-fixed'
        style={{
          display: `${editBlog.isEditing ? "block" : "none"}`,
          zIndex: "3",
          position: "absolute",
          marginLeft: "auto",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className='mb-3 position-relative'>
          <label forhtml='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='title'
            aria-describedby='blogTitle'
            onChange={handleBlogTitleChange}
            value={blogTitle}
          />
          <p
            style={{
              color: "red",
              fontSize: ".8rem",
              position: "absolute",
              textAlign: "left",
              width: "100%",
            }}
          >
            {emptyBlogTtitle}
          </p>
        </div>
        <div className='mb-3' style={{ position: "relative" }}>
          <label forhtml='blogBody' className='form-label'>
            Body
          </label>
          <textarea
            type='text'
            className='form-control'
            onChange={handleBlogBodyChange}
            value={blogBody}
            id='blogBody'
            style={{ minHeight: "300px" }}
          />
          <p
            style={{
              position: "absolute",
              bottom: "0px",
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
              position: "absolute",
              bottom: "-20px",
              textAlign: "right",
            }}
          >
            {emptyBlogBody}
          </p>
        </div>
        <div className='m-3 d-flex justify-content-center'>
          <input className='d-none' type='file' id='imgupload' onChange={handleImageUpload} ref={inputFile} />
          <button className={`btn ${!blogImage ? "btn-outline-primary" : "btn-success"} `} onClick={onButtonClick}>
            {!blogImage ? "Upload Image" : "Image Uploaded ✔ "}
          </button>
        </div>

        <div className='my-4'>
          <div className='tags-input-container'>
            <div style={{ display: "flex", gap: "20px", padding: "10px" }}>
              <label htmlFor='tags'>Add a Tags:</label>
              <button style={{ width: "50px", border: "none", fontSize: "1.2rem" }} onClick={handleTags}>
                -
              </button>
            </div>
            <p style={{ color: "red", fontSize: ".8rem", marginBottom: "0rem" }}>
              {tagsMessage && "Maximum length for tags is 4"}
            </p>
            <p style={{ color: "red", fontSize: ".8rem" }}> {emptyTagMssage}</p>

            <select name='tags' id='tags' onChange={(e) => handleChange(e)} value={options}>
              <option value='start'>Choose Tag:</option>
              <option value='HTML'>HTML</option>
              <option value='CSS'>CSS</option>
              <option value='SASS'>SASS</option>
              <option value='BOOTSTRAP'>BOOTSTRAP</option>
              <option value='TAILWIND'>TAILWIND</option>
              <option value='JAVASCRIPT'>JAVASCRIPT</option>
              <option value='REACT'>REACT</option>
              <option value='Angular'>ANGULAR</option>
              <option value='VUE'>VUE</option>
              <option value='NEXT JS'>NEXT JS</option>
              <option value='NODE'>NODE</option>
              <option value='EXPRESS'>EXPRESS</option>
              <option value='REST API'>REST API</option>
              <option value='PHP'>PHP</option>
              <option value='PYTHON'>PYTHON</option>
              <option value='UI-UX'>UI-UX</option>
              <option value='FRONT-END'>FRONT-END</option>
              <option value='EXPRESS'>EXPRESS</option>
              <option value='PHP'>PHP</option>
              <option value='PYTHON'>PYTHON</option>
              <option value='UI-UX'>UI-UX</option>
              <option value='BACK-END'>BACK-END</option>
              <option value='GRAPH Ql'>GRAPH Ql</option>
              <option value='CSS'>CSS</option>
            </select>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "10px",
                justifyContent: "center",
                gap: "0 1rem",
              }}
            >
              {splitTag(tags)}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type='submit' className='btn btn-primary my-1 ' onClick={updateBlog}>
            Edit Blog
          </button>
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

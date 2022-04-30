import { useState } from "react";
import Blogs from "../Components/Blogs";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../Context/authContext";
import FilterBlogs from "../Components/FilterBlogs";
function Home() {
  const [options, setOptions] = useState("All Blogs");
  const [myBlogs, setMyBlogs] = useState([]);
  const [AllBlogs, setAllBlogs] = useState([]);
  const { isSignIn } = User();
  const id = isSignIn.uid;

  return (
    <div>
      {isSignIn !== false && (
        <div style={homePageHeader}>
          <Link
            to="create-post"
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "2rem",
            }}
          >
            <FaPlusCircle />
          </Link>
          <FilterBlogs
            id={id}
            options={options}
            setOptions={setOptions}
            setMyBlogs={setMyBlogs}
            setAllBlogs={setAllBlogs}
          />
        </div>
      )}
      <Blogs myBlogs={myBlogs} AllBlogs={AllBlogs} options={options} />
    </div>
  );
}

const homePageHeader = {
  padding: ".5rem",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderBottom: "1px solid #808080",
};

export default Home;

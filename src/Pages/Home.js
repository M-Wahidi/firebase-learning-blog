import Blogs from "../Components/Blogs";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../Context/authContext";
import FilterBlogs from "../Components/FilterBlogs";
function Home() {
  const { isSignIn } = User();
  const id = isSignIn.uid;
  return (
    <div>
      {isSignIn !== false && (
        <div className="homePageHeader">
          <Link
            to="create-post"
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "2.2rem",
              position: "relative",
            }}
          >
            <FaPlusCircle />
          </Link>
          <FilterBlogs id={id} />
        </div>
      )}
      <Blogs />
    </div>
  );
}

export default Home;

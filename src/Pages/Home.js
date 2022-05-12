import Blogs from "../Components/Blogs";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../Context/authContext";
import FilterBlogs from "../Components/FilterBlogs";
import { auth } from "../firebaseConfig";

function Home() {
  const { isSignIn } = User();
  const id = isSignIn.uid;

  console.log(auth.currentUser);

  return (
    <div>
      {isSignIn !== false && (
        <div className='homePageHeader'>
          <Link
            to='create-blog'
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

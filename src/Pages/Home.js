import Blogs from "../Components/Blogs";
import { Link } from "react-router-dom";
import { User } from "../Context/AuthContext";
import FilterBlogs from "../Components/FilterBlogs";
import Button from "react-bootstrap/Button";

function Home() {
  const { isSignIn } = User();
  const id = isSignIn.uid;

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
            <Button variant='primary'>+</Button>
          </Link>
          <FilterBlogs id={id} />
        </div>
      )}
      <Blogs />
    </div>
  );
}

export default Home;

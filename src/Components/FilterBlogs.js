import {
  query,
  where,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

function FilterBlogs({ id, options, setOptions, setMyBlogs, setAllBlogs }) {
  const fetchFilterData = (type) => {
    const blogsRef = collection(db, "blogs");
    const userQuery = query(
      blogsRef,
      where("authorID", "==", id),
      orderBy("timestamp", "desc")
    );
    const orderByDateQuery = query(blogsRef, orderBy("timestamp", "desc"));

    if (type === "My Blogs") {
      setUserOpition(userQuery, setMyBlogs);
    }
    if (type === "All Blogs") {
      setUserOpition(orderByDateQuery, setAllBlogs);
    }
  };

  const setUserOpition = (query, setBlog) => {
    onSnapshot(query, (snapshot) => {
      let blogList = [];
      snapshot.forEach((doc) => {
        blogList.push({ ...doc.data(), id: doc.id });
      });
      setBlog(blogList);
    });
    return () => {
      "error";
    };
  };

  const handleChange = (e) => {
    setOptions(e.target.value);
    fetchFilterData(e.target.value);
  };

  return (
    <div>
      <div>
        <select
          name="filter"
          id="filter"
          onChange={handleChange}
          value={options}
        >
          <option value="All Blogs">All Blogs</option>
          <option value="My Blogs">My Blogs</option>
          <option value="Saved Blogs">Saved Blogs</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBlogs;

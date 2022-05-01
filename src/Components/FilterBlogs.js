import {
  query,
  where,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Filter } from "../Context/FilterBlogsContext";
function FilterBlogs({ id }) {
  const { setMyBlogs, setOpitions, opitions, setFilterLoading } = Filter();

  const fetchFilterData = (type) => {
    const blogsRef = collection(db, "blogs");
    const userQuery = query(
      blogsRef,
      where("authorID", "==", id),
      orderBy("timestamp", "desc")
    );
    if (type === "My Blogs") {
      setUserOpition(userQuery, setMyBlogs);
    }
  };

  const setUserOpition = (query, setBlog) => {
    setFilterLoading(true);
    onSnapshot(query, (snapshot) => {
      let blogList = [];
      snapshot.forEach((doc) => {
        blogList.push({ ...doc.data(), id: doc.id });
      });
      setTimeout(() => {
        setBlog(blogList);
        setFilterLoading(false);
      }, 400);
    });
    return () => {
      "error";
    };
  };

  const handleChange = (e) => {
    setOpitions(e.target.value);
    fetchFilterData(e.target.value);
  };

  return (
    <div>
      <div>
        <select
          name="filter"
          id="filter"
          onChange={handleChange}
          value={opitions}
        >
          <option value="All Blogs">All Blogs</option>
          <option value="My Blogs">My Blogs</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBlogs;

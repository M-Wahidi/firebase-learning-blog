import { createContext, useState, useContext } from "react";

export const FilterCTX = createContext();

function FilterBlogsContext({ children }) {
  const [opitions, setOpitions] = useState("All Blogs");
  const [myBlogs, setMyBlogs] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);

  return (
    <FilterCTX.Provider value={{ opitions, myBlogs, setOpitions, setMyBlogs, filterLoading, setFilterLoading }}>
      {children}
    </FilterCTX.Provider>
  );
}

export default FilterBlogsContext;

export const Filter = () => {
  return useContext(FilterCTX);
};

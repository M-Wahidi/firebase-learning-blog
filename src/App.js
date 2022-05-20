import { useContext } from "react";
import Container from "./Components/Container";
import UserProvider from "./Context/AuthContext";
import EditProvider from "./Context/EditBlogContext";
import { ThemeContext } from "./Context/ThemeContext";
import FilterBlogsContext from "./Context/FilterBlogsContext";
function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <UserProvider>
      <EditProvider>
        <FilterBlogsContext>
          <div
            className="App"
            style={{
              height: "100vh ",
              position: "relative",
              background:
                "url(https://animal-crossing.com/assets/img/patterns/footer-dots.png)",
              backgroundColor: `${theme === "dark" ? "#333" : ""}`,
            }}
          >
            <Container />
          </div>
        </FilterBlogsContext>
      </EditProvider>
    </UserProvider>
  );
}

export default App;

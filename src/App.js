import Container from "./Components/Container";
import UserProvider from "./Context/authContext";
import EditProvider from "./Context/editBlogContext";
import FilterBlogsContext from "./Context/FilterBlogsContext";
function App() {
  return (
    <UserProvider>
      <EditProvider>
        <FilterBlogsContext>
          <div className='App'>
            <Container />
          </div>
        </FilterBlogsContext>
      </EditProvider>
    </UserProvider>
  );
}

export default App;

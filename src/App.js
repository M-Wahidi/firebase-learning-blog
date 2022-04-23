import Container from "./Components/Container";
import UserProvider from './Context/authContext'
import EditProvider from './Context/editBlogContext'

function App() {
  return (
    <UserProvider>
       <EditProvider>
          <div className='App'>
            <Container />
          </div>
        </EditProvider>
    </UserProvider>

  )
}

export default App;

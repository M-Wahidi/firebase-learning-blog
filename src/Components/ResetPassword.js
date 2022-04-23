import { useState,useEffect } from 'react'
import {getAuth,sendPasswordResetEmail } from 'firebase/auth'
import Notification from './Notification'
import {useLocation,useNavigate } from "react-router-dom";
import checkPath from '../Helper/checkPath';
import Loading from './Loading';
function ResetPassword() {
    const[newEmail,setNewEmail] = useState('')
    const [error,setError] = useState(false)
    const [completed,setCompleted] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation().pathname


 
    const handleResetPassword = (e) =>{ 
        e.preventDefault()
        const auth = getAuth();
        setCompleted(false);
        setError(false);
        setIsLoading(true);
    
        sendPasswordResetEmail(auth, newEmail)
        .then(() => {
          setTimeout(() => {
            setIsLoading(false);
            setCompleted(true);
          }, 1000);
          setTimeout(() => {
            setCompleted(false);
          }, 2500);
  
        })
        .catch((error) => {
          setTimeout(() => {
            setIsLoading(false);
            setError(error.message);
          }, 1000);
          setTimeout(() => {
            setError("");
          }, 2500);
        });
        setNewEmail('')
    }

    useEffect(() =>{
        if(checkPath(location)){
          navigate('/')
        }
      })

  return (
      <>
    <form style={containerStyle} onSubmit={handleResetPassword}>
        <h1>FORGOT PASSOWRD</h1>
        <input type="text" onChange={(e) => setNewEmail(e.target.value)} value={newEmail} placeholder='Email...'  style={{border:'1px solid rgba(101, 101, 102,0.4)'}}/>
        <button onClick={handleResetPassword} style={{backgroundColor:'#8ff57f',padding:'5px 20px',border:'none'}}>Send</button>
    </form>
    <Notification
        opition={{
          title: error ? "Error" : "",
          message: error ? error : completed ? `Password reset email sent!` : "",
        }}
        completed={completed}
        error={error}
      />
            {isLoading && <Loading />}

    </>
  )
}

const containerStyle = {
    display:'flex' ,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
    left:'50%',
    transform:'translate(-50%)',
    marginTop:'1rem',
    gap:'1.5rem',
    padding:'1rem',
    maxWidth:'600px',
    backgroundColor:'#fff',
    
}

export default ResetPassword
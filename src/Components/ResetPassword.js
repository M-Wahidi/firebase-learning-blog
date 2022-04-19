import React, { useState } from 'react'
import {getAuth,sendPasswordResetEmail } from 'firebase/auth'
import Notification from './Notification'
function ResetPassword() {
    const[newEmail,setNewEmail] = useState('')
    const [error,setError] = useState('')
    const [completed,setCompleted] = useState(false)


 
    const handleResetPassword = () =>{
        const auth = getAuth();
        sendPasswordResetEmail(auth, newEmail)
        .then(() => {
            if(!error){
                setCompleted(true)
            }
        })
        .catch((error) => {
            setError(error.message)
        });
        setTimeout(() =>{
            setError('')
            setCompleted(false)
        },2000)
        setNewEmail('')
    }

  return (
      <>
    <div style={containerStyle}>
        <h1>FORGOT PASSOWRD</h1>
        <input type="text" onChange={(e) => setNewEmail(e.target.value)} value={newEmail} placeholder='Email...'  style={{border:'1px solid rgba(101, 101, 102,0.4)'}}/>
        <button onClick={handleResetPassword} style={{backgroundColor:'#8ff57f',padding:'5px 20px',border:'none'}}>Send</button>
    </div>
    <Notification
        opition={{
          title: error ? "Error" : "",
          message: error ? error : completed ? `Password reset email sent!` : "",
        }}
        completed={completed}
        error={error}
      />
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
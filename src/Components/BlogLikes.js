import {useState,useContext} from 'react'
import { BiComment,BiHeart,BiShare } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import {UserContext} from '../Context/authContext'
import { auth,db } from '../firebaseConfig';
import {doc,getDoc,collection} from 'firebase/firestore'

function BlogLikes({blogID}) {

    const [likes,setLikes] = useState(0);
    const {isSignIn} = useContext(UserContext)

    const handleLikes = async () =>{
        if(!isSignIn) return 
        const blogRef = collection(db,'blogs')
        const snap = await getDoc(doc(blogRef, blogID))
        if (snap.exists()) {
          const likesCount = snap.data().likesCount
          setLikes(likesCount + 1)
        }
        else {
          console.log("No such document")
        }       
    } 

    const sendLikesToDB = () =>{
        
    }
 
  
  return (
    <div className="userInteraction">
          <div> <span>50</span> <BiComment /></div>
          <div onClick={handleLikes}> <span>{likes}</span> <BiHeart />  </div>
          <div><BiShare /></div>
    </div>
  )
}

export default BlogLikes
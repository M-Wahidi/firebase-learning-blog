import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function ProfileView() {
  const { id } = useParams();
  const userRef = doc(db, "users", id);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await getDoc(userRef);
    setUser(user.data());
  };

  const { image, username, email, age } = user;

  return (
    <div className="container ">
      <div className="card h-100">
        <div className="card-body">
          <div className="account-settings">
            <div className="user-profile">
              <div className="user-avatar">
                <div className="image">
                  <img src={image} alt="profilePicture" />
                </div>
              </div>
              <h1 className="user-name">{username}</h1>
              <h5 className="py-5">{email}</h5>
              <h6 className="mt-2">Age: {age} </h6>
            </div>
            <div className="about" style={{ paddingTop: "3rem" }}>
              <h5>About</h5>
              <p className="container col-9 " style={{ fontSize: "1rem" }}>
                {user.about}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;

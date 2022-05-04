import React, { useEffect, useState, useContext } from "react";
import ProfileCard from "../Components/ProfileCard";
import ProfileForm from "../Components/ProfileForm";
import ProfileFooter from "../Components/ProfileFooter";
import Loading from "../Components/Loading";
import Notification from "../Components/Notification";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { EditBlogContext } from "../Context/editBlogContext";

function Profile({ imageURL, setImageURL }) {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { setEditBlog } = useContext(EditBlogContext);

  const userValue = {
    fullName,
    age,
    about,
    currentPassword,
    newPassword,
    profilePic,
  };

  const userAction = {
    setFullName,
    setAge,
    setAbout,
    setCurrentPassword,
    setNewPassword,
  };

  useEffect(() => {
    setEditBlog({ isEditing: false, blogId: 0 });
    onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setUserInfo(doc.data());
    });
  }, []);

  return (
    <div className="container">
      <div className="row gutters">
        <ProfileCard
          setProfilePic={setProfilePic}
          profilePic={profilePic}
          setImageURL={setImageURL}
          imageURL={imageURL}
          userValue={userValue}
          userInfo={userInfo}
        />
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <ProfileForm userAction={userAction} userValue={userValue} />
              <ProfileFooter
                userAction={userAction}
                userValue={userValue}
                setLoading={setLoading}
                setError={setError}
                setCompleted={setCompleted}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
      <Notification
        opition={{
          title: error ? "Error" : "",
          message: error ? error : completed,
        }}
        completed={completed}
        error={error}
      />
      {loading && <Loading />}
    </div>
  );
}

export default Profile;

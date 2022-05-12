import React, { useEffect, useRef, useState } from "react";
import { auth, storage, db } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import Loading from "../Components/Loading";
function ProfileCard({ setProfilePic, profilePic, setImageURL, imageURL, userInfo }) {
  const [loading, setLoading] = useState(false);
  const inputFile = useRef(null);
  const imagePath = ref(storage, `users/${auth.currentUser.uid}`);
  const imageRef = ref(storage, `users/`);

  const onButtonClick = () => {
    inputFile.current.click();
  };
  const uploadImage = () => {
    if (profilePic === "") return;
    setLoading(true);
    uploadBytes(imagePath, profilePic).then(() => {
      getUserDownloadImage();
    });
  };
  const getUserDownloadImage = () => {
    listAll(imageRef).then((resp) => {
      resp.items.forEach((item) => {
        if (item.name === auth.currentUser?.uid) {
          getDownloadURL(item).then((url) => {
            setImageURL(url);
            updateProfile(auth.currentUser, {
              photoURL: url,
            });
            setDoc(
              doc(db, "users", auth.currentUser?.uid),
              {
                image: url,
              },
              { merge: true }
            );
          });
        }
      });
    });
    setProfilePic("");
  };
  useEffect(() => {
    onSnapshot(doc(db, "users", auth.currentUser?.uid), (doc) => {
      getUserDownloadImage();
    });
    setLoading(false);
  }, [imageURL]);

  return (
    <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12'>
      <div className='card h-100'>
        <div className='card-body'>
          <div className='account-settings'>
            <div className='user-profile'>
              <div className='user-avatar'>
                <div className='image'>
                  {imageURL === "" ? (
                    <Skeleton count={1} borderRadius={100} width={120} height={120} />
                  ) : (
                    <img
                      src={imageURL || "https://bootdey.com/img/Content/avatar/avatar7.png"}
                      alt={auth.currentUser?.displayName}
                    />
                  )}
                </div>

                <div className='m-3'>
                  <input
                    className='d-none'
                    type='file'
                    id='imgupload'
                    onChange={(e) => setProfilePic(e.target.files[0])}
                    ref={inputFile}
                  />
                  <button
                    className={`btn ${!profilePic ? "btn-outline-primary" : "btn-primary"} `}
                    onClick={onButtonClick}
                  >
                    Uplaod
                  </button>
                </div>
              </div>
              <h5 className='user-name'>{userInfo?.username}</h5>
              <h6 className='user-email'>{userInfo?.email}</h6>
              <h6 className='user-email mt-2 '>AGE: {userInfo?.age} </h6>
            </div>
            <div className='about'>
              <h5>About</h5>
              <p>{userInfo?.about}</p>
            </div>
          </div>
        </div>
        <button
          className={`btn  ${!profilePic ? "btn-outline-primary" : "btn-primary"} `}
          style={{
            maxWidth: "200px",
            textAlign: "center",
            position: "relative",
            left: "50%",
            bottom: "18px",
            transform: "translateX(-50%)",
            opacity: `${!profilePic ? "0.5" : 1}`,
            pointerEvents: `${!profilePic ? "none" : "auto"}`,
          }}
          onClick={uploadImage}
        >
          Update Profile Picture
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default ProfileCard;

import React from "react";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  updatePassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
function ProfileFooter({
  userValue,
  userAction,
  setLoading,
  setError,
  setCompleted,
  error,
}) {
  const { fullName, age, about, currentPassword, newPassword } = userValue;

  const resetInputValues = () => {
    Object.entries(userAction).map((elem) => {
      const setValue = elem[1];
      setValue("");
    });
  };

  const updatePersonalInfo = async () => {
    if (!fullName && !age && !about && !currentPassword & !newPassword) {
      return;
    }
    setLoading(true);
    if (currentPassword !== "") {
      handlUpdatePassword();
      return;
    }

    const user = await getDoc(doc(db, "users", auth.currentUser.uid));
    const userValue = user.data();
    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      {
        username: !fullName ? userValue.username : fullName,
        age: !age ? userValue.age : age,
        about: !about ? userValue.about : about,
      },
      { merge: true }
    );
    await updateProfile(auth.currentUser, {
      displayName: !fullName ? userValue.fullName : fullName,
    });
    resetInputValues();
    setLoading(false);
    setCompleted("Profile Updated");

    setTimeout(() => {
      setCompleted(false);
    }, 2000);
  };

  const handlUpdatePassword = () => {
    if (!currentPassword) return;
    if (newPassword.trim().length < 6) {
      setTimeout(() => {
        setLoading(false);
        setError("Password must be at least 6 characters");
      }, 1000);
      setTimeout(() => {
        setError(false);
      }, 2500);
      return;
    }
    signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then(() => {
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            setCompleted("Password Changed");
          })
          .catch((err) => {
            setTimeout(() => {
              setError(err.message);
            }, 500);
          });
      })
      .catch((err) => {
        setTimeout(() => {
          setError(err.message);
        }, 500);
      });

    setTimeout(() => {
      setCompleted(false);
      setError(false);
    }, 3000);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    resetInputValues();
  };

  return (
    <div className="row gutters mt-5">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: ".5rem",
            marginRight: "17px",
            position: "relative",
            top: "2rem",
            padding: "1rem 0",
          }}
        >
          <button
            type="button"
            id="submit"
            name="submit"
            className="btn btn-secondary"
            onClick={resetInputValues}
          >
            Cancel
          </button>
          <button
            type="button"
            id="submit"
            name="submit"
            className="btn btn-primary"
            onClick={updatePersonalInfo}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileFooter;

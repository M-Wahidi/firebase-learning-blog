import React from "react";

function ProfileForm({ userValue, userAction }) {
  const { about, age, currentPassword, fullName, newPassword } = userValue;

  const { setFullName, setAge, setAbout, setCurrentPassword, setNewPassword } =
    userAction;

  return (
    <form>
      <div className="card-body">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h6 className="mb-2 text-primary">Personal Details</h6>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2">
            <div className="form-group">
              <label htmlFor="fullName" className="mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Enter Full Name"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12  mt-2">
            <div className="form-group">
              <label htmlFor="userName" className="mb-1">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                placeholder="Enter Age"
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-2">
            <div className="form-group">
              <label htmlFor="about" className="mb-1">
                About
              </label>
              <textarea
                type="url"
                className="form-control"
                id="about"
                placeholder="About"
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                maxLength={180}
              />
            </div>
          </div>
        </div>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-2">
            <h6 className="mt-3 mb-2 text-primary">Privacy</h6>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2">
            <div className="form-group">
              <label htmlFor="passowrd-one" className="mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passowrd-one"
                placeholder="Enter a Currant Passowrd"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                autoComplete={"current-passowrd"}
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2">
            <div className="form-group">
              <label htmlFor="passowrd-two" className="mb-1">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passowrd-two"
                placeholder="Enter a New Passowrd"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                autoComplete={"new-passowrd"}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfileForm;

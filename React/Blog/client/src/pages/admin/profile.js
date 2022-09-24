import axios from "axios";
import { useState } from "react";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

export default function Profile() {
  // User Cookie
  const userInfo = JSON.parse(Cookies.get("user"));

  const [formInput, setformInput] = useState({
    userID: userInfo.userID,
    // image: {},
    name: userInfo.username,
    email: userInfo.email,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // console.log(userInfo);

  // Form Input Change
  function handleFormChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setformInput({
      ...formInput,
      [name]: value,
    });
    // console.log(formInput);
  }

  // Submit Form Function
  async function handleSubmit(e) {
    e.preventDefault();
    toast.dismiss();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios
      .post(
        process.env.REACT_APP_SERVER_BASE + "/editprofile",
        formInput,
        config
      )
      .then((response) => {
        const res = response.data;
        if (res.success) {
          toast.success(res.success);
        }
      })
      .catch((err) => {
        const errors = err.response.data;
        console.log(errors);
        errors.forEach((error) => {
          toast.error(error);
        });
      });
  }

  // Set Image in (formInput) for upload through (handleSubmit)
  // function setImage(e) {
  //   const imageFile = e.target.files[0];
  //   console.log(imageFile);

  //   document.getElementById("profileImage").src =
  //     URL.createObjectURL(imageFile);
  //   setformInput({
  //     ...formInput,
  //     image: imageFile,
  //   });
  // }

  return (
    <div className="container">
      <Helmet>
        <title>Admin Profile</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="card p-4">
        <div className="card-body">
          <div className="row">
            <form action="#" method="post">
              <div className="row">
                {/* Image Input */}
                {/* <div className="col-4">
                  <label>
                    <img
                      src={
                        userInfo.image
                          ? userInfo.image
                          : "/images/No_Image_Available.jpg"
                      }
                      className="img-fluid rounded-circle mb-3"
                      htmlFor="image"
                      id="profileImage"
                      style={{ maxHeight: "196px" }}
                      alt="profile img"
                    />
                    <input
                      type="file"
                      className="d-none"
                      name="image"
                      onChange={(e) => setImage(e)}
                    />
                  </label>
                </div> */}
                <div className="col-6">
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="col-12 ps-2 pb-1 text-black-50"
                    >
                      Name
                    </label>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        name="name"
                        id="name"
                        value={formInput.name}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="col-12 ps-2 pb-1 text-black-50"
                    >
                      E-mail
                    </label>
                    <div className="col-12">
                      <input
                        type="email"
                        className="form-control rounded-pill"
                        name="email"
                        id="email"
                        value={formInput.email}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3 col-12">
                    <label
                      htmlFor="oldPassword"
                      className="col-12 ps-2 pb-1 text-black-50"
                    >
                      Old Password
                    </label>
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control rounded-pill"
                        name="oldPassword"
                        id="oldPassword"
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3 col-12">
                    <label
                      htmlFor="newPassword"
                      className="col-12 ps-2 pb-1 text-black-50"
                    >
                      New Password
                    </label>
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control rounded-pill"
                        name="newPassword"
                        id="newPassword"
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3 col-12">
                    <label
                      htmlFor="confirmPassword"
                      className="col-12 ps-2 pb-1 text-black-50"
                    >
                      Confirm Password
                    </label>
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control rounded-pill"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-orange w-100"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

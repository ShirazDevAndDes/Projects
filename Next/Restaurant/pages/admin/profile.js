import { useState } from "react";
import { useSession } from "next-auth/react";
import AdminLayout from "../../layout/adminLayout/adminLayout";
import axios from "axios";
import { toast } from "react-toastify";

AdminProfile.auth = true;
AdminProfile.authOptions = {
  role: "admin",
};

AdminProfile.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default function AdminProfile() {
  const { data: session } = useSession();

  // console.log(session);
  const [formInput, setFormInput] = useState({
    image: "",
    username: session.user.username,
    email: session.user.email,
    address: session.user.address,
    password: "",
    confirmPassword: "",
  });

  // Update formInput
  function handleInput(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setFormInput({
      ...formInput,
      [name]: value,
    });

    // console.log(formInput);
  }

  // Set image src and update formInput.image
  async function imageChange(e) {
    const target = e.target;
    const file = target.files[0];

    if (file) {
      const src = URL.createObjectURL(file);

      document.getElementById("userImage").src = src;

      setFormInput({
        ...formInput,
        image: file.name,
        // itemImageFile: src,
      });
    }
  }

  // Submit profile form
  async function submitUserInfo(e) {
    e.preventDefault();

    const userID = session.user.id;
    // console.log(session);

    await axios
      .post("/api/postUser", {
        userID,
        ...formInput,
        operation: "update",
        operationType: "updateUser",
      })
      .then(async (response) => {
        const res = response.data;
        console.log(res);

        if (res.successes.length > 0) {
          const imageFile = document.getElementById("userImageFile").files[0];

          // If image is set then upload image
          if (imageFile) {
            let formData = new FormData();
            formData.append("image", imageFile);
            await axios
              .post("/api/uploadImage", formData)
              .then((response) => {
                const res = response.data;
                // console.log(res.success);
                toast.success(res.success);
              })
              .catch((err) => {
                const error = err.response.data;
                // console.log(error);
                toast.error(error);
              });
          }

          toast.success(res.success);
        }

        return res;
      })
      .catch((err) => {
        const error = err.response;
        // console.log(err);
        toast.error(error);
      });
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="container">
            <h4 className="card-title mb-4">User Info:</h4>
            <div className="row">
              <div className="col-3">
                <label
                  className="h-100 w-100"
                  htmlFor="userImageFile"
                  // style={{ border: "2px solid black" }}
                >
                  <img
                    src={
                      session.user.image
                        ? "/uploads/" + session.user.image
                        : "/images/No_Image_Available.jpg"
                    }
                    className="img-fluid"
                    alt=""
                    id="userImage"
                  />
                </label>
                <input
                  type="file"
                  className="form-control d-none"
                  name="userImageFile"
                  id="userImageFile"
                  placeholder="User Image"
                  aria-describedby="fileHelpId"
                  onChange={imageChange}
                />
              </div>
              <div className="col-9">
                <div className="mb-3 row">
                  <label htmlFor="username" className="col-xs-4 col-form-label">
                    Name
                  </label>
                  <div className="col-xs-8">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      id="username"
                      placeholder="Name"
                      value={formInput.username}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-xs-4 col-form-label">
                    E-mail
                  </label>
                  <div className="col-xs-8">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="E-mail"
                      value={formInput.email}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3 row">
                      <label
                        htmlFor="password"
                        className="col-xs-4 col-form-label"
                      >
                        Password
                      </label>
                      <div className="col-xs-8">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="Password"
                          value={formInput.password}
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3 row">
                      <label
                        htmlFor="confirmPassword"
                        className="col-xs-4 col-form-label"
                      >
                        Confirm Password
                      </label>
                      <div className="col-xs-8">
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          value={formInput.confirmPassword}
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-orange w-100"
                onClick={submitUserInfo}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

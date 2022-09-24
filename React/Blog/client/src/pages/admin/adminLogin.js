import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formInput, setformInput] = useState({});

  // useEffect(() => {}, []);

  // Handle Form Input on change of input field
  function handleFormChange(e) {
    const Target = e.target;
    const Name = Target.name;
    const Value = Target.value;

    setformInput({
      ...formInput,
      [Name]: Value,
    });
  }

  // Handle login form on click
  async function handleSubmit(e) {
    e.preventDefault();

    const form_msg = document.getElementById("form_message");
    form_msg.style.display = "none";

    let errors = "";

    const msg = { success: [], errors: [] };

    axios.defaults.withCredentials = true;
    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/loginAdmin", formInput)
      .then((response) => {
        // console.log(response.data);
        const res = response.data;
        const success = res.success;
        const userData = Cookies.get("user");

        if (userData.length > 0) {
          msg.success += '<p class="mb-1">' + success + "</p>";
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        const errorData = err.response.data;
        const errorKeys = Object.keys(errorData);
        const errorIsEmpty = errorKeys.length > 0;

        console.log(errorData);

        if (errorIsEmpty) {
          errorKeys.forEach((key, value) => {
            if (errorData[key].length > 0) {
              msg.errors.push(errorData[key]);
              // console.log(errorData[key]);
            }
          });
        }
      });

    Object.values(msg.errors).forEach(async (value) => {
      // console.log(value);

      errors += '<p class="mb-1">' + value + "</p>";
    });
    // console.log(msg.errors);
    if (msg.success.length > 0) {
      form_msg.classList.remove("alert-danger");
      form_msg.classList.add("alert-success");
      form_msg.innerHTML = msg.success;
      form_msg.style.display = "block";
    } else if (msg.errors.length > 0) {
      form_msg.classList.remove("alert-success");
      form_msg.classList.add("alert-danger");
      form_msg.innerHTML = errors;
      form_msg.style.display = "block";
    }
  }

  return (
    <div className="container-fluid bg-orange">
      <div className="row">
        <Helmet>
          <title>Admin Login</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <div className="card col-md-4 col-lg-3 m-auto" minheight="348">
          <div className="card-body">
            <p className="p-4 h3 text-center">Admin Login</p>
            <form>
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
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="col-12 ps-2 pb-1 text-black-50"
                >
                  Password
                </label>
                <div className="col-12">
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    name="pass"
                    id="pass"
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="col-sm-10">
                  <button
                    type="submit"
                    className="btn btn-orange"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <div
              id="form_message"
              className="alert my-2"
              style={{ display: "none" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

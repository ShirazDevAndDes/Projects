import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [searchPosts, setsearchPosts] = useState("");

  let navigate = useNavigate();

  function searchForPosts(e) {
    e.preventDefault();

    const search = searchPosts;

    if (search) {
      navigate(`/search/${search}`);
    }

    // axios
    //   .post(process.env.REACT_APP_SERVER_BASE + "/searchPost", { search })
    //   .then((response) => {
    //     const res = response.data;
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     const error = err.response.data;
    //   });
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white shadow-sm">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          Blog
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/post"} className="nav-link">
                Post
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/category"} className="nav-link">
                Category
              </Link>
            </li>
          </ul>
          <form className="d-flex my-2 my-lg-0">
            <input
              className="form-control me-sm-2"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setsearchPosts(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-orange my-2 my-sm-0"
              type="submit"
              onClick={searchForPosts}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

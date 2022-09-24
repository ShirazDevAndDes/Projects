import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar({ userInfo }) {
  const username = userInfo.username;

  const navigate = useNavigate();

  function logout() {
    Cookies.remove("user");

    const cookieExists = Cookies.get("user");

    if (!cookieExists) {
      navigate("/admin");
    }
  }

  useEffect(() => {
    const cookieExists = Cookies.get("user");

    if (!cookieExists) {
      navigate("/admin");
    }
  }, [logout]);

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white shadow-sm mb-5">
      <div className="container">
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="dropdownId"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <img
                  src="/images/pizza-1.png"
                  className="img-fluid rounded-circle"
                  alt="profile img"
                  style="height: 20px; margin-top: -5px;"
                />{" "}  */}
                {username}
              </a>

              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownId"
              >
                <Link to={"./profile"} className="dropdown-item">
                  Profile
                </Link>
                <a
                  href=""
                  className="dropdown-item bg-danger text-white"
                  onClick={logout}
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

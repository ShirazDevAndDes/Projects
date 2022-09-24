export default function AdminNavbar() {
  return (
    <nav class="navbar navbar-expand-sm navbar-light bg-white shadow-sm mb-5">
      <div class="container">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="/images/pizza-1.png"
                  class="img-fluid rounded-circle"
                  alt="profile img"
                  style="height: 20px; margin-top: -5px;"
                />{" "}
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownId">
                <a class="dropdown-item" href="#">
                  Profile
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

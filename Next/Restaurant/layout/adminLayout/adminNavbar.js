import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function AdminNavbar() {
  const { data: session } = useSession();
  // console.log(session);
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
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={"/uploads/" + session.user.image}
                  className="rounded-circle"
                  alt="profile img"
                  style={{ width: "28px", height: "25px", marginTop: "-5px" }}
                />{" "}
                {session.user.username}
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownId"
              >
                <Link href={"/admin/profile"}>
                  <a className="dropdown-item">Profile</a>
                </Link>
                <button
                  className="dropdown-item bg-danger text-white"
                  onClick={() => signOut({ callbackUrl: "/admin" })}
                >
                  Sign out
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer bg-orange p-4 text-center">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to={"/"} className="nav-link text-white">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/post"} className="nav-link text-white">
            Post
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/category"} className="nav-link text-white">
            Category
          </Link>
        </li>
      </ul>
      <p className="text-white fw-bold">2022 Copyright at Blog</p>
    </div>
  );
}

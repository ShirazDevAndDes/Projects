import { Link, NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <nav className="nav flex-column col-3 sidebar py-5 bg-orange text-white">
      <div className="p-4"></div>
      <Link to={"./dashboard"} className="nav-link">
        Dashboard
      </Link>
      <Link to={"./createPost"} className="nav-link">
        Create Post
      </Link>
      <Link to={"./editPost"} className="nav-link">
        Edit Post
      </Link>
      <Link to={"./addCategory"} className="nav-link">
        Add Category
      </Link>
      <NavLink to={"./addTags"} className="nav-link">
        Add Tags
      </NavLink>
    </nav>
  );
}

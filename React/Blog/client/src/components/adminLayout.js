import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import "../admin-styles.css";
import AdminNavbar from "./adminNavbar";
import AdminSidebar from "./adminSidebar";

export default function AdminLayout() {
  const userInfo = JSON.parse(Cookies.get("user"));

  return (
    <div className="container-fluid">
      <div className="row">
        <ToastContainer autoClose={false} theme={"colored"} />
        <AdminSidebar />

        <div className="col-9 content">
          <AdminNavbar userInfo={userInfo} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

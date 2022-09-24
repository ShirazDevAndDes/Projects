import AdminNavbar from "./adminNavbar";
import AdminSidebar from "./adminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="container-fluid h-100 adminSection">
      <div className="row h-100">
        <div className="col-md-3 col-lg-2 p-0">
          <AdminSidebar />
        </div>
        <div className="col-md-9 col-lg-10 p-0">
          <AdminNavbar />
          {children}
        </div>
      </div>
      {/* clearfix */}
    </div>
  );
}

import AdminNavbar from "./adminNavbar";
import AdminSidebar from "./adminSidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="col-2">
        <AdminSidebar />
      </div>
      <div className="col-10">
        <AdminNavbar />
        {children}
      </div>
    </>
  );
}

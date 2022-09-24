import Link from "next/link";

export default function AdminSidebar() {
  return (
    <nav className="nav flex-column sidebar py-5 bg-orange text-white ">
      <div className="p-4"></div>
      <Link href="/admin/dashboard">
        <a className="nav-link">Dashboard</a>
      </Link>
      <Link href="/admin/category">
        <a className="nav-link">Categories</a>
      </Link>
      <Link href="/admin/items">
        <a className="nav-link">Menu Items</a>
      </Link>
      <Link href="/admin/orders">
        <a className="nav-link">Orders</a>
      </Link>
    </nav>
  );
}

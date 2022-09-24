export default function AdminSidebar() {
  return (
    <nav class="nav flex-column col-3 sidebar py-5 bg-orange text-white">
      <div class="p-4"></div>
      <a class="nav-link active" aria-current="page" href="#">
        Dashboard
      </a>
      <a class="nav-link" href="#">
        Categories
      </a>
      <a class="nav-link" href="#">
        Menu Items
      </a>
    </nav>
  );
}

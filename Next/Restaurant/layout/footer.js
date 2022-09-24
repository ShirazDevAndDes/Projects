export default function Footer() {
  return (
    <div className="footer bg-orange p-4 text-center">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link text-white active" href="#">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Menu
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Contact Us
          </a>
        </li>
      </ul>
      <p className="text-white fw-bold">
        2022 Copyright at Creative Restaurant
      </p>
    </div>
  );
}

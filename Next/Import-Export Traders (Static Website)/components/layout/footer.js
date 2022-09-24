import { faLocation, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="container-fluid p-5 bg-black footer">
      <div className="row text-white">
        <div className="col">
          <h2 className="h2">
            Pages <hr className="bg-white opacity-100 my-2 w-24" />
          </h2>
          <ul className="nav">
            <li className="nav-item w-100">
              <Link href="/">
                <a className="nav-link py-0">Home</a>
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link href="/about">
                <a className="nav-link py-0">About</a>
              </Link>
            </li>
            <li className="nav-item w-100">
              <Link href="/contact-us">
                <a className="nav-link py-0">Contact Us</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <h2 className="h2">
            Contact <hr className="bg-white opacity-100 my-2 w-28" />
          </h2>
          <ul className="list-unstyled">
            <li className="flex">
              <FontAwesomeIcon icon={faLocation} size="lg" className="pe-2" />
              <p>123 - Z Street 10 XYZ, City</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} size="lg" />
              <p>012 - 234 - XXX</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faWhatsapp} size="lg" />
              <p>012 - 234 - XXX</p>
            </li>
          </ul>
        </div>
        <div className="col">
          <h2 className="h2">
            Social <hr className="bg-white opacity-100 my-2 w-24" />
          </h2>
          <ul className="list-unstyled">
            <Link href="#">
              <li>
                <FontAwesomeIcon icon={faFacebook} size="lg" />
                <p>facebook.com/trade</p>
              </li>
            </Link>
            <Link href="#">
              <li>
                <FontAwesomeIcon icon={faTwitter} size="lg" />
                <p>twitter.com/trade</p>
              </li>
            </Link>
            <Link href="#">
              <li>
                <FontAwesomeIcon icon={faInstagram} size="lg" />
                <p>instagram.com/trade</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

import { faLocation, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import HeadTop from "../components/layout/head-top";
import PageTransition from "../components/pageTransition";
import Animate from "../components/animation";

function ContactUs() {
  return (
    <PageTransition>
      <Animate>
        <Head></Head>
        <Animate variant={"fadeIn"}>
          <HeadTop title="Contact Us" />
        </Animate>
        <div className="container-fluid bg-light p-5">
          <div className="row">
            <Animate variant={"fadeIn"} className="col-6">
              <div className="card glassmorphism shadow h-100">
                <div className="card-body p-4">
                  <h4 className="h2">Contact</h4>
                  <ul className="list-unstyled">
                    <li className="my-3">
                      <FontAwesomeIcon
                        icon={faPhone}
                        size="lg"
                        className="pe-2"
                      />
                      <p className="d-inline pl-2">012 - 234 - XXX</p>
                    </li>
                    <li className="my-3">
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        size="lg"
                        className="pe-2"
                      />
                      <p className="d-inline pl-2">012 - 234 - XXX</p>
                    </li>
                    <li>
                      <p>Feel free to contact us any time</p>
                    </li>
                  </ul>
                </div>
              </div>
            </Animate>

            <Animate variant={"fadeIn"} className="col-6">
              <div className="card glassmorphism shadow h-100">
                <div className="card-body p-4">
                  <h4 className="card-title h2">Social</h4>
                  <ul className="list-unstyled">
                    <li className="my-3">
                      <FontAwesomeIcon
                        icon={faFacebook}
                        size="lg"
                        className="pe-2"
                      />
                      <p className="d-inline pl-2">facebook.com/trade</p>
                    </li>
                    <li className="my-3">
                      <FontAwesomeIcon
                        icon={faTwitter}
                        size="lg"
                        className="pe-2"
                      />
                      <p className="d-inline pl-2">twitter.com/trade</p>
                    </li>
                    <li className="my-3">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        size="lg"
                        className="pe-2"
                      />
                      <p className="d-inline pl-2">instagram.com/trade</p>
                    </li>
                  </ul>
                </div>
              </div>
            </Animate>

            <Animate variant={"fadeIn"} className="col-12 mt-4">
              <div className="card neumorphism shadow">
                <div className="card-body p-4">
                  <h4 className="card-title h2">Address</h4>
                  <ul className="list-unstyled">
                    <li className="my-3">
                      <FontAwesomeIcon
                        icon={faLocation}
                        size="lg"
                        className="pe-2"
                      />
                      <p className="d-inline pl-2">
                        123 - Z Street 10 XYZ, City
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </Animate>
    </PageTransition>
  );
}

// ContactUs.displayName = "ContactUs";
// export default PageTransition(ContactUs);
export default ContactUs;

// export default <PageTransition OriginalComponent={ContactUs} />;

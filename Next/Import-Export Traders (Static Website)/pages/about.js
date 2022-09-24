import { motion } from "framer-motion";
import Head from "next/head";
import HeadTop from "../components/layout/head-top";
import PageTransition from "../components/pageTransition";
import Animate from "../components/animation";

const About = () => {
  return (
    <PageTransition>
      <Animate>
        <Head></Head>
        <Animate variant="fadeIn">
          <HeadTop title="About Us" />
        </Animate>
        <div className="container-fluid p-5">
          <div className="row">
            <Animate
              variant="fadeIn"
              viewport={{ once: true }}
              className="col-6 display-6"
            >
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam
            </Animate>
            <Animate
              variant="fadeIn"
              viewport={{ once: true }}
              className="col-6"
            >
              <img src="/cargo_ship_2.jpg" className="img-fluid rounded" />
            </Animate>
          </div>
        </div>
        <div className="row">
          <div className="col-8"></div>
          <div className="col-4"></div>
        </div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-8"></div>
        </div>
        <div className="row">
          <div className="col-8"></div>
          <div className="col-4"></div>
        </div>
      </Animate>
    </PageTransition>
  );
};

// About.displayName = "About";
// export default PageTransition(About);
export default About;

// export default <PageTransition OriginalComponent={About} />;

import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}

export default MyApp;

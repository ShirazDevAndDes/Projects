import { motion } from "framer-motion";

import Layout from "../components/layout/layout";

function PageTransition({ children }) {
  return (
    <Layout>
      {children}
      {/* <OriginalComponent /> */}
      <motion.div
        className="slide-in bg-orange-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <motion.div
        className="slide-out bg-orange-500"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </Layout>
  );
}

// PageTransition.displayName = "PageTransition";

export default PageTransition;

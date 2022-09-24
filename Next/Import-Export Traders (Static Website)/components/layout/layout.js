import Footer from "./footer";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />

      {/* <motion.div
        className="slide-in bg-success"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.div
        className="slide-out bg-danger"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      /> */}
    </div>
  );
}

import Navbar from "./navbar";
import Footer from "./footer";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return;
  }

  return (
    <>
      <Navbar session={session} message={"message sent"} />
      {children}
      <Footer />
    </>
  );
}

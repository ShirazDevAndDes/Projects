import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Layout from "../layout/Layout";

import { SessionProvider, useSession } from "next-auth/react";
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer theme="colored" autoClose={false} />
          {Component.auth ? (
            <Auth options={Component.authOptions}>
              {getLayout(<Component {...pageProps} />)}
            </Auth>
          ) : (
            getLayout(<Component {...pageProps} />)
          )}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

function Auth({ options, children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: session, status } = useSession({ required: true });

  const route = useRouter();

  if (status != "loading") {
    if (!session) {
      // console.log("not session");
      toast.error("You are not Logged In");
      route.push("/admin");
    } else {
      // console.log("session");
      if (session.user.role != options.role) {
        if (session.user.role === "admin") {
          toast.error("You are not allowed because you are a the admin");
          route.push("/admin");
        } else if (session.user.role === "user") {
          toast.error("You are not allowed because you are a User");
          route.push("/");
        } else {
          toast.error("Something went wrong");
          route.push("/");
        }
      } else {
        return children;
      }
    }
  }
}

export default MyApp;

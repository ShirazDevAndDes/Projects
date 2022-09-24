import Head from "next/head";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function AdminLogin() {
  const { data: session } = useSession();

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  if (session) {
    console.log(session);
  }

  // Update formInput after input field change
  function handelInput(e) {
    const target = e.target;
    const name = target.name;

    const value = target.value;

    setFormInput({
      ...formInput,
      [name]: value,
    });
  }

  // Login admin after checking his credentials
  function adminLogin(e) {
    e.preventDefault();

    signIn("credentials", {
      ...formInput,
      role: "admin",
      callbackUrl: "/admin/dashboard",
    }).then(async (result) => {
      // Check for errors if any

      // Errors Array
      const errors = {
        Signin: "Try signing with a different account.",
        OAuthSignin: "Try signing with a different account.",
        OAuthCallback: "Try signing with a different account.",
        OAuthCreateAccount: "Try signing with a different account.",
        EmailCreateAccount: "Try signing with a different account.",
        Callback: "Try signing with a different account.",
        OAuthAccountNotLinked:
          "To confirm your identity, sign in with the same account you used originally.",
        EmailSignin: "Check your email address.",
        CredentialsSignin:
          "Sign in failed. Check the details you provided are correct.",
        default: "Unable to sign in.",
      };
      // console.log(result);

      // If errors were found
      if (result.error) {
        // check if error exists in error array
        if (errors[error]) {
          // display error if in array
          toast.error(errors[error]);
        } else {
          // display my custom error set in backend
          const error = result.error;
          error.split(",").forEach((err) => {
            toast.error(err);
          });
        }
        // console.log(error);
      }
    });
  }

  return (
    <div className="container-fluid bg-orange h-100">
      <Head>
        <title>Admin Login</title>
      </Head>

      <div className="row h-100">
        <div className="card col-4 m-auto" style={{ height: "400px" }}>
          <img src="./Fast_Food_Logo.png" className="img-fluid pt-5 p-4" />
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="col-12 ps-2 pb-1 text-black-50"
                >
                  E-mail
                </label>
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    name="email"
                    id="email"
                    onChange={handelInput}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="col-12 ps-2 pb-1 text-black-50"
                >
                  Password
                </label>
                <div className="col-12">
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    name="password"
                    id="pass"
                    onChange={handelInput}
                  />
                </div>
              </div>
              <div className="mb-5">
                <div className="col-sm-10">
                  <button
                    type="submit"
                    className="btn btn-orange"
                    onClick={adminLogin}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import NavSearch from "../components/navSearch";
import NavCart from "../components/navCart";

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   return {
//     props: { session }, // will be passed to the page component as props
//   };
// }

export default function Navbar({ session }) {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  async function toggleTab(e, tabName) {
    e.preventDefault();

    const bootstrap = (await import("bootstrap/dist/js/bootstrap")).default;

    if (tabName == "login") {
      var triggerEl = await document.querySelector("#myTab #login-tab");
      bootstrap.Tab.getOrCreateInstance(triggerEl).show();
    } else if (tabName == "signup") {
      var triggerEl = await document.querySelector("#myTab #signup-tab");
      bootstrap.Tab.getOrCreateInstance(triggerEl).show();
    }

    // console.log(triggerEl);
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function signupInputField(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setSignupInput({
      ...signupInput,
      [name]: value,
    });
  }

  function loginInputField(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  }

  async function signup(e) {
    e.preventDefault();

    // console.log(signupInput);
    await axios
      .post("http://localhost:3000/api/signupUser", signupInput)
      .then((response) => {
        const res = response.data;

        if (res.errors) {
          res.errors.forEach((error) => {
            toast.error(error);
          });
        }

        if (res.successes) {
          let successMsg = "";

          res.successes.forEach((success) => {
            divSuccess += "<p>" + success + "</p>";
          });

          toast.success(successMsg);
        }
        // console.log(res);
      })
      .catch((err) => {
        const error = err.response;
      });
  }

  async function login(e) {
    e.preventDefault();

    // console.log(loginInput);

    signIn("credentials", {
      ...loginInput,
      role: "user",
      redirect: false,
    }).then(async (result) => {
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

      const error = result.error;

      if (error) {
        toast.dismiss();
        if (errors[error]) {
          toast.error(errors[error]);
        } else {
          error.split(",").forEach((err) => {
            toast.error(err);
          });
        }
        // console.log(error);
      } else {
        toast.dismiss();
      }

      if (!error) {
        const bootstrap = (await import("bootstrap/dist/js/bootstrap")).default;

        const myModalEl = document.getElementById("modelSignup_Login");
        const myModal = await bootstrap.Modal.getOrCreateInstance(myModalEl);
        await myModal.hide();
      }
    });
  }

  async function logout(e) {
    e.preventDefault();

    if (router.asPath.split("/")[1] === "orders") {
      signOut({ callbackUrl: "/" });
    } else {
      signOut({ redirect: false });
    }
  }
  // console.log(session);
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light fixed-top">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <img
                src={"/Fast_Food_Logo.png"}
                width="120px"
                height="auto"
                style={{ paddingBottom: "4px" }}
              />
            </a>
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav d-flex justify-content-around me-auto mt-lg-0">
              {navigation.map(({ name, href }) => (
                <li
                  key={name}
                  className={classNames(
                    router.asPath == href ? "nav-item active" : "nav-item",
                    "rounded me-2"
                  )}
                >
                  <Link href={href}>
                    <a className="nav-link">{name}</a>
                  </Link>
                </li>
              ))}
            </ul>
            {!session || session.user.role === "admin" ? (
              <button
                type="button"
                className="btn btn-outline-orange rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#modelSignup_Login"
              >
                Signup / Login
              </button>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-outline-orange rounded-pill dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={"/uploads/" + session.user.image}
                    className="img-fluid rounded-circle me-2 p-0 m-0"
                    alt=""
                    style={{ maxHeight: "22px" }}
                  />
                  {session.user.username}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link href="/user/profile">
                      <a className="dropdown-item">Profile</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/orders/" + session.user.id}>
                      <a className="dropdown-item">Orders</a>
                    </Link>
                  </li>
                  <li>
                    <button
                      className="bg-danger text-white dropdown-item"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <NavSearch type="button" />
            <NavCart type="button" />
          </div>
        </div>
      </nav>

      {!session || session.user.role != "user" ? (
        // SignUp and Login Modal
        <div
          className="modal fade"
          id="modelSignup_Login"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelignup_Login"
          aria-hidden="true"
          data-bs-backdrop="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <ul className="nav nav-tabs d-none" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="signup-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#signup"
                      type="button"
                      role="tab"
                      aria-controls="signup"
                      aria-selected="true"
                    >
                      Sign Up
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="login-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#login"
                      type="button"
                      role="tab"
                      aria-controls="login"
                      aria-selected="false"
                    >
                      Login
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade"
                    id="signup"
                    role="tabpanel"
                    aria-labelledby="signup-tab"
                  >
                    <form className="signup_form p-4">
                      <h5 className="text-center mb-4">Sign Up</h5>
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-transparent border-end-0 ps-3">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0"
                          placeholder="E-mail"
                          aria-label="E-mail"
                          name="email"
                          onChange={(e) => signupInputField(e)}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-transparent border-end-0 ps-3">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          type="password"
                          className="form-control border-start-0"
                          placeholder="Password"
                          aria-label="Password"
                          name="password"
                          onChange={(e) => signupInputField(e)}
                        />
                      </div>
                      <button
                        className="btn btn-orange w-100 mb-4"
                        onClick={signup}
                      >
                        Sign Up
                      </button>
                      <p>
                        Already have an account{" "}
                        <button
                          className="btn btn-light lh-1"
                          onClick={(e) => toggleTab(e, "login")}
                        >
                          Login
                        </button>
                      </p>

                      <div id="signup-errors"></div>
                      <div id="signup-success"></div>
                    </form>
                  </div>
                  <div
                    className="tab-pane fade show active"
                    id="login"
                    role="tabpanel"
                    aria-labelledby="login-tab"
                  >
                    <form className="login_form p-4">
                      <h5 className="text-center text-muted mb-4">Login</h5>
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-transparent border-end-0 ps-3">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0"
                          placeholder="E-mail"
                          aria-label="E-mail"
                          name="email"
                          onChange={(e) => loginInputField(e)}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-transparent border-end-0 ps-3">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          type="password"
                          className="form-control border-start-0"
                          placeholder="Password"
                          aria-label="Password"
                          name="password"
                          onChange={(e) => loginInputField(e)}
                        />
                      </div>
                      <button
                        className="btn btn-orange w-100 mb-4"
                        onClick={login}
                      >
                        Login
                      </button>
                      <p>
                        Already have an account{" "}
                        <button
                          className="btn btn-light lh-1"
                          onClick={(e) => toggleTab(e, "signup")}
                        >
                          Sign Up
                        </button>
                      </p>

                      <div id="login-errors"></div>
                      <div id="login-success"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <NavSearch type="modal" />
      <NavCart type="offcanvas" />

      <div style={{ height: "57px" }}></div>
    </>
  );
}

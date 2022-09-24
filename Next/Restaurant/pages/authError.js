import { getProviders } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Error() {
  const { error } = useRouter().query;

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
    SessionRequired: "You need to login first.",
    default: "Unable to sign in.",
  };

  let errorData = "";
  // console.log(error);
  if (error) {
    if (errors[error]) {
      errorData = errors[error];
    } else {
      error.split(",").forEach((err) => {
        errorData += err;
      });
    }
  } else {
    errorData = "something went wrong";
  }

  return (
    <div className="container text-center h-100 d-flex align-items-center">
      <div className="alert alert-danger w-100" role="alert">
        <strong>{errorData}</strong>
        <br />
        <Link href="/">
          <a className="btn btn-danger mt-2">Go Back To Home Page</a>
        </Link>
      </div>
    </div>
  );
}

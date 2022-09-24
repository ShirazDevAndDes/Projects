import jwt from "jsonwebtoken";

export default function Protected(props) {
  const token = true;

  if (token) {
    jwt.verify(token, "secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/admin");
      } else {
        console.log("error occurred");
      }
    });
  } else {
    res.redirect("/admin");
  }
}

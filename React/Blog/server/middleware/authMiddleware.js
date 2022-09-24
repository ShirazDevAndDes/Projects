const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  // Get authorization from header
  const authorization = req.headers.authorization;

  // Check to see if header has authorization header
  if (!authorization) {
    // Not Authorized Error if no token found
    res.status(401).json("Not Authorized to do anything");
  } else {
    // Check if token exists
    const token = authorization.split(" ")[1];
    // console.log(token);

    if (token) {
      // Verify token
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(401).json("Not Authorized");
          res.redirect("http://localhost:3000/admin");
        }
      });
    } else {
      // If token does not exist send error
      res.status(401).json("Non Authorized User");
      res.redirect("http://localhost:3000/admin");
    }
  }

  next();
};

module.exports = { requireAuth };

const jwt = require("jsonwebtoken");
const jwtSecret = require("../config");

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwtToken = words[1];
  jwt.verify(jwtToken, jwtSecret, (err, payload) => {
    if (err) {
      res.json({
        msg: "Error authenticating user",
      });
    } else {
      next();
    }
  });
}

module.exports = adminMiddleware;

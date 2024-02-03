const jwt = require("jsonwebtoken");
const jwtSecret = require("../config");

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwtToken = words[1];
  jwt.verify(jwtToken, jwtSecret, (err, payload) => {
    if (err) {
      res.json({
        msg: "Error authenticating user",
      });
    } else {
      req.user = payload;
      next();
    }
  });
}

module.exports = userMiddleware;

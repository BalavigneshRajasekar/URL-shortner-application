const Jwt = require("jsonwebtoken");
require("dotenv").config();

const urlAuth = async (req, res, next) => {
  const token = req.header("Authorization");
  try {
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    const verifyToken = Jwt.verify(token, process.env.LOGINJWT);

    req.user = verifyToken;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid token", err: err });
  }
};

module.exports = urlAuth;

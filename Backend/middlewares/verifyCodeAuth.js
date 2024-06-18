const Jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyCodeAuth = (req, res, next) => {
  const resetToken = req.header("Authorization");
  console.log(resetToken);

  try {
    if (!resetToken) {
      return res.status(401).json({ message: "Token Doesn't exist" });
    }
    const verified = Jwt.verify(resetToken, process.env.RESETCODEJWT);
    req.user = verified;

    next();
  } catch (err) {
    res.status(401).json({ message: "Verification code expired" });
  }
};

module.exports = verifyCodeAuth;

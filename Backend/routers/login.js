const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginRouter = express.Router();

//Endpoint help to login the user when the credentials are true and user is active
loginRouter.post("/login/user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const activeUser = await User.findOne({ email: email });
    if (!activeUser) {
      return res.status(404).send({ message: "user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, activeUser.password);
    if (!passwordMatch) {
      return res.status(404).send({ message: "wrong password" });
    }
    if (!activeUser.isActive) {
      return res.status(404).send({ message: "user is not active" });
    }
    //Generate Auth Token for User
    const authToken = await jwt.sign(
      {
        id: activeUser._id,
        name: activeUser.name,
        email: activeUser.email,
      },
      process.env.LOGINJWT,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .send({ message: "Login successfully", authToken: authToken });
  } catch (err) {
    res.status(404).send({ message: "server error" });
  }
});

module.exports = loginRouter;

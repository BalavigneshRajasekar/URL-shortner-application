const express = require("express");
const bcrypt = require("bcrypt");
const mailGen = require("mailgen");
const nodeMailer = require("nodemailer");
const User = require("../models/Users");

const router = express.Router();

// Endpoint to create an account and activation email
router.post("/register/user", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashed,
    });
    await newUser.save();

    // Creating the mail template in order to send user
    const mailGenerator = new mailGen({
      theme: "default",
      product: {
        name: "Account Activation",
        link: "http://localhost:3000",
      },
    });
    const createdUser = await User.findOne({ email: email });

    const mail = mailGenerator.generate({
      body: {
        name: createdUser.name,
        intro: `Hi ${createdUser.name}`,
        action: {
          instructions: "To Activate account, click the below button:",
          button: {
            color: "#22BC66",
            text: "Activate account",
            link: `http://localhost:3000/api/register/activate/${createdUser._id}`,
          },
        },
      },
    });

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "vigneshvickybsc1999@gmail.com",
        pass: process.env.PASS,
      },
    });

    const messages = {
      from: "vigneshvickybsc1999@gmail.com",
      to: email,
      subject: "Account Activation",
      text: "Hi find Activation link here",
      html: mail,
    };
    transporter
      .sendMail(messages)
      .then((err, info) => {
        res
          .status(200)
          .send({ message: "Account created check mail to Activation" });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//endpoint for activate the account of the user

router.get("/activate/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isActive) {
      return res.status(400).json({ message: "Account already activated" });
    }
    user.isActive = true;
    await user.save();
    return res.render("activation", {
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

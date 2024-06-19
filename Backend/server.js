const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routers/register");
const loginRouter = require("./routers/login");
const urlRouter = require("./routers/url");
const resetRouter = require("./routers/resetLink");
const resetPassword = require("./routers/forgotPassword");
require("dotenv").config();
const app = express();

//middlewares
app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Route paths
app.use("/api/register", router);
app.use("/api/login", loginRouter);
app.use("/api/reset", resetRouter);
app.use("/api", resetPassword);
app.use("/url", urlRouter);

mongoose.connect(process.env.MONGODB).then(() => {
  console.log("Database connected");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});

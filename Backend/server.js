const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routers/register");
const loginRouter = require("./routers/login");
const app = express();

//middlewares
app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Route paths
app.use("/api/register", router);
app.use("/api/login", loginRouter);

mongoose.connect("mongodb://localhost:27017/URL_Shortener").then(() => {
  console.log("Database connected");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});

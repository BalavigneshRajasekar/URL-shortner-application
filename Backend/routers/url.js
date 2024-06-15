const express = require("express");
const shortId = require("shortid");
const Url = require("../models/Url");
const urlAuth = require("../middlewares/urlAuth");

const urlRouter = express.Router();

// endpoint to generate the short url
urlRouter.post("/generate/url", urlAuth, async (req, res) => {
  const { url } = req.body;
  try {
    const shortUrl = shortId.generate();
    const newUrl = new Url({ url, shortUrl, user: req.user.id });
    await newUrl.save();
    res.status(200).json({
      message: "Short URL created",
      url: `http://localhost:3000/url/getShortUrl/${shortUrl}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to redirect the short url to the actual path
urlRouter.get("/getShortUrl/:shortUrl", async (req, res) => {
  const url = await Url.findOne({ shortUrl: req.params.shortUrl });
  if (url) {
    res.redirect(url.url);
  } else {
    res.status(404).json({ message: "Url not found" });
  }
});

//Get the Url created by the particular user

urlRouter.get("/getUrl", urlAuth, async (req, res) => {
  try {
    const url = await Url.find({ user: req.user.id }).populate("user");
    res.status(200).json(url);
  } catch (err) {
    res.status(500).json({ message: err.message, data: "invalid" });
  }
});

module.exports = urlRouter;

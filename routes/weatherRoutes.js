const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const API_KEY = process.env.WEATHER_API_KEY;

const router = express.Router();

function getToken(req) {
  if (!req.headers.authorization) return null;
  return req.headers.authorization.split(" ")[1];
}

const authorize = (req, res, next) => {
  const token = getToken(req);
  if (!token) return res.status(403).json({ error: "No token. Unauthorized." });
  if (jwt.verify(token, process.env.JWT_KEY)) {
    req.decode = jwt.decode(token);
    next();
  } else {
    res.status(403).json({ error: "Not Authorized." });
  }
};

router.route("/").get(authorize, async (req, res) => {
  const city = req.query.city;
  try {
    const weather = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    res.status(200).json({ status: "success", data: weather.data });
  } catch (err) {
    res.status(400).json({ status: "error", data: err });
  }
});

module.exports = router;

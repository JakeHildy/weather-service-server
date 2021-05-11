const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const API_KEY = process.env.WEATHER_API_KEY;

const router = express.Router();

router.route("/").get(async (req, res) => {
  const city = req.query.city;
  try {
    const weather = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    res.status(200).json({ status: "success", data: weather.data });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

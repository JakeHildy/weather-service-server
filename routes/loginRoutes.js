const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const jwt = require("jsonwebtoken");

const router = express.Router();

router.route("/").post((req, res) => {
  const { accessCode } = req.body;
  if (accessCode !== process.env.ACCESS_CODE) {
    return res
      .status(400)
      .json({ status: "fail", message: "Incorrect Credentials" });
  }

  // Correct Access Code
  let token = jwt.sign({ status: "success" }, process.env.JWT_KEY);
  res.status(200).json({ token });
});

module.exports = router;

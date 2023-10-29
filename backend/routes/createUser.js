const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtsecertKey = "Hello,MyNameIsNishitAndIAmFromSu";

router.post(
  "/createuser",

  body("name", "Invalid Name").isLength({ min: 3 }),
  body("email", "Invalid Email").isEmail(),
  body("password", "Invalid Password").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: securePassword,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",

  body("email", "Invalid Email").isEmail(),
  body("password", "Invalid Password").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      let userData = await User.findOne({ email: req.body.email });

      if (!userData) {
        return res
          .status(400)
          .json({ error: "Try To Logging With Diffrent Credentials" });
      }

      const comparePassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!comparePassword) {
        return res
          .status(400)
          .json({ error: "Try To Logging With Diffrent Credentials" });
      }

      const user = {
        id: userData.id,
      };

      const authToken = jwt.sign(user, jwtsecertKey);

      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;

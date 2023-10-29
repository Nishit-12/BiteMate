const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/getlocation", async (req, res) => {
  try {
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    let location = await axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?key=ef6ce0daa6f74f2c8f51beb5bbbb6414&q=${latitude}+${longitude}&pretty=1`
      )
      .then((axoisRes) => {
        let response = axoisRes.data.results[0].components;
        console.log(axoisRes.data.results[0].components);
        console.log(response);

        let { city, state, country, postcode } = response;
        console.log(city,state,country,postcode);
        return String(city + "," + state + "," + country + "," + postcode);
      })
      .catch((error) => {
        console.log(error);
      });

      res.send({location})
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

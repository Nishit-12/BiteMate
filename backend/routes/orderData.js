const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/myorders", async (req, res) => {
  let data = req.body.orderData;
  await data.splice(0, 0, { orderDate: req.body.orderDate });

  let eId = await Order.findOne({ email: req.body.email });

  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { order_data: data },
        }
      );

      res.json({ success: true });
    } catch (error) {
      res.json({ success: false });
    }
  }
});

router.post("/myorderdata", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    
    res.send(myData)
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

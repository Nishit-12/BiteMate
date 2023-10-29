const mongoose = require("mongoose");
const mongodb_URL =
  "mongodb+srv://nishitpatel12261227:wXOoOAUnjXHSyBkq@cluster0.cajfnca.mongodb.net/biteMateMERN";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongodb_URL);
    console.log("Database Connected Successfully.");

    const fetch_data = mongoose.connection.db.collection("food_items");

    const data = await fetch_data.find({}).toArray();
    global.food_items = data;

    const fetch_category_data =
      mongoose.connection.db.collection("food_category");

    const catData = await fetch_category_data.find({}).toArray();
    global.food_category = catData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoDB;

const express = require("express");
const app = express();
const port = 8000;
const mongoDB = require("./db");
const createuser = require("./routes/createUser");
const displayData = require("./routes/displayData");
const orderData = require("./routes/orderData");
const location = require("./routes/getLocation");

const cors = require("cors");

mongoDB();

const corsOptions = {
  origin: ["https://bitemate.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true //access-control-allow-credentials:true
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use("/api/", createuser);

app.use("/api/", displayData);

app.use("/api/", orderData);

app.use("/api/", location);

app.listen(port, () => {
  console.log(`App Listning On Port ${port}`);
});

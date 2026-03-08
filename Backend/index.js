require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* ===============================
   INSERT HOLDINGS DATA
================================ */

app.get("/addHoldings", async (req, res) => {

  const holdings = [
    {
      name: "BHARTIARTL",
      qty: 2,
      avg: 538.05,
      price: 541.15,
      net: "+0.58%",
      day: "+2.99%",
    },
    {
      name: "HDFCBANK",
      qty: 2,
      avg: 1383.4,
      price: 1522.35,
      net: "+10.04%",
      day: "+0.11%",
    },
    {
      name: "INFY",
      qty: 1,
      avg: 1350.5,
      price: 1555.45,
      net: "+15.18%",
      day: "-1.60%",
      isLoss: true,
    }
  ];

  for (let item of holdings) {
    const newHolding = new HoldingsModel(item);
    await newHolding.save();
  }

  res.send("Holdings added!");
});


/* ===============================
   INSERT POSITIONS DATA
================================ */

app.get("/addPositions", async (req, res) => {

  const positions = [
    {
      product: "CNC",
      name: "EVEREADY",
      qty: 2,
      avg: 316.27,
      price: 312.35,
      net: "+0.58%",
      day: "-1.24%",
      isLoss: true,
    },
    {
      product: "CNC",
      name: "JUBLFOOD",
      qty: 1,
      avg: 3124.75,
      price: 3082.65,
      net: "+10.04%",
      day: "-1.35%",
      isLoss: true,
    }
  ];

  for (let item of positions) {
    const newPosition = new PositionsModel(item);
    await newPosition.save();
  }

  res.send("Positions added!");
});


/* ===============================
   GET HOLDINGS
================================ */

app.get("/allHoldings", async (req, res) => {

  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);

});


/* ===============================
   GET POSITIONS
================================ */

app.get("/allPositions", async (req, res) => {

  const allPositions = await PositionsModel.find({});
  res.json(allPositions);

});


/* ===============================
   CREATE ORDER
================================ */

app.post("/newOrder", async (req, res) => {

  const newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode
  });

  await newOrder.save();

  res.send("Order saved!");

});


/* ===============================
   DATABASE CONNECTION
================================ */

mongoose.connect(uri)
.then(() => {

  console.log("MongoDB connected");

  app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

  });

})
.catch(err => console.log(err));
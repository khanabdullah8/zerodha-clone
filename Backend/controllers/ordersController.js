const OrdersModel = require("../models/OrdersModel");

// GET all orders
const getOrders = async (req, res) => {
  try {
    const data = await OrdersModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST new order (BUY)
const createOrder = async (req, res) => {
  try {
    const newOrder = new OrdersModel(req.body);
    await newOrder.save();
    res.json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getOrders, createOrder };
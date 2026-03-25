const { OrdersModel } = require("../model/OrdersModel");

const getOrders = async (req, res) => {
  try {
    const data = await OrdersModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order saved",
      order: newOrder
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getOrders, createOrder };
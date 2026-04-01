const HoldingsModel = require("../models/HoldingsModel");

const getHoldings = async (req, res) => {
  try {
    const data = await HoldingsModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getHoldings };
const { PositionsModel } = require("../model/PositionsModel");

const getPositions = async (req, res) => {
  try {
    const data = await PositionsModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPositions };
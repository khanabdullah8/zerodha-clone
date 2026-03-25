const express = require("express");
const router = express.Router();

const { getHoldings } = require("../controllers/holdingsController");

router.get("/", getHoldings);

module.exports = router;
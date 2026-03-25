require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// ROUTES
const holdingsRoutes = require("./routes/holdingsRoutes");
const positionsRoutes = require("./routes/positionsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT DATABASE
connectDB();

// ROUTES USE
app.use("/api/holdings", holdingsRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/orders", ordersRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Zerodha API Running 🚀");
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
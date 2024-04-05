const express = require("express");
const database = require("./config/database");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const port = process.env.PORT || 3000;
require("dotenv").config();

database.connectDB();
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

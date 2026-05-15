const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("PlacePro API is running...");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/aptitude", require("./routes/aptitudeRoutes"));
app.use("/api/gd", require("./routes/gdRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
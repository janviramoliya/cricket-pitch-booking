require("dotenv").config();
const express = require("express");
const sequelize = require("./src/connect/connect");
const cookieParser = require("cookie-parser");
const http = require("http");
const { initSocket } = require("./socket");
require("./src/models/associations");

const authRoutes = require("./src/routes/auth.route");
const slotRoutes = require("./src/routes/slot.route");
const bookingRoutes = require("./src/routes/booking.route");
const pitchRoutes = require("./src/routes/pitch.route");
const cors = require("cors");
const authenticateUser = require("./src/middlewares/isAuthenticated");
const { connectRedis } = require("./src/utils/redis");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/slot", authenticateUser, slotRoutes);
app.use("/api/v1/booking", authenticateUser, bookingRoutes);
app.use("/api/v1/pitch", authenticateUser, pitchRoutes);

const connectDB = async () => {
  try {
    await connectRedis();
    console.log("Connected to redis successfully");

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Optional: Sync models with the database (creates tables if they don't exist)
    // await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    // Exit the process if connection fails
    process.exit(-1);
  }
};

(async () => {
  await connectDB();
  const server = http.createServer(app);
  initSocket(server);
  server.listen(process.env.PORT, () => {
    console.log("Started listening on port: " + process.env.PORT);
  });
})();

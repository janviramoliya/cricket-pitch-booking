require("dotenv").config();
const sequelize = require("../connect/connect");
const Pitch = require("../models/pitch.model");
const Slot = require("../models/slot.model");

// import models
require("../models/user.model");
require("../models/pitch.model");
require("../models/slot.model");
require("../models/booking.model");

// import associations
require("../models/associations");

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    await sequelize.sync({ alter: true });

    console.log("All models synced successfully");

    // 1. Seed Pitches
    await Pitch.bulkCreate(
      [
        {
          name: "pitch 1",
          location: "Turf Ground",
          price_per_hour: 700,
        },
        {
          name: "pitch 2",
          location: "Box Cricket",
          price_per_hour: 600,
        },
        {
          name: "pitch 3",
          location: "Indoor Nets",
          price_per_hour: 500,
        },
      ],
      { ignoreDuplicates: true }, // prevents duplicate insert
    );

    console.log("✅ Pitches seeded");

    // 2. Seed Slots
    await Slot.bulkCreate(
      [
        {
          start_time: "18:00:00",
          end_time: "19:00:00",
        },
        {
          start_time: "19:00:00",
          end_time: "20:00:00",
        },
        {
          start_time: "20:00:00",
          end_time: "21:00:00",
        },
      ],
      { ignoreDuplicates: true },
    );

    console.log("✅ Slots seeded");

    process.exit();
  } catch (error) {
    console.error("Error syncing DB:", error);
    process.exit(1);
  }
};

syncDB();

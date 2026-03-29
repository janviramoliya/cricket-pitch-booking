const { Sequelize } = require("sequelize");
const Booking = require("../models/booking.model");
const Slot = require("../models/slot.model");
const customError = require("../errors");
const { redisClient } = require("../utils/redis");

const getSlotsService = async (pitchId, bookingDate) => {
  try {
    // get Redis reserved slots
    const pattern = `slot:${pitchId}:${bookingDate}:*`;
    const keys = await redisClient.keys(pattern);

    const reservedSlotIds = keys.map((key) => key.split(":")[3]);

    const slots = await Slot.findAll({
      attributes: [
        "id",
        "start_time",
        "end_time",
        [
          Sequelize.literal(`
            CASE 
            WHEN EXISTS (
                SELECT 1 FROM booking b
                WHERE b.slot_id = "slot"."id"
                AND b.pitch_id = '${pitchId}'
                AND b.booking_date = '${bookingDate}'
            )
            OR "slot"."id" IN (${reservedSlotIds.length ? reservedSlotIds.map((id) => `'${id}'`).join(",") : "NULL"})
            THEN false
            ELSE true
            END
        `),
          "available",
        ],
      ],
      include: [
        {
          model: Booking,
          attributes: [],
          required: false,
          where: {
            pitch_id: pitchId,
            booking_date: bookingDate,
            //   status: "confirmed",
          },
        },
      ],
      order: [["start_time", "ASC"]],
    });
    return slots;
  } catch (error) {
    throw new customError.CustomAPIError("Error occurred while fetching slots");
  }
};

module.exports = { getSlotsService };

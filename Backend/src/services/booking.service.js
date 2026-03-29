const Booking = require("../models/booking.model");
const Pitch = require("../models/pitch.model");
const Slot = require("../models/slot.model");
const customError = require("../errors");
const sequelize = require("../connect/connect");
const { redisClient } = require("../utils/redis");

const myBookingService = async (userId) => {
  try {
    const bookings = await Booking.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Pitch,
          attributes: ["id", "name", "location", "price_per_hour"],
        },
        {
          model: Slot,
          attributes: ["id", "start_time", "end_time"],
        },
      ],
      order: [["booking_date", "DESC"]],
    });

    return bookings;
  } catch (error) {
    throw new customError.CustomAPIError(
      "Error fetching bookings: " + error.message,
    );
  }
};

const confirmBookingService = async ({
  userId,
  pitch_id,
  slot_id,
  booking_date,
}) => {
  const transaction = await sequelize.transaction();

  try {
    // 1. Check if already booked
    const existingBooking = await Booking.findOne({
      where: {
        pitch_id,
        slot_id,
        booking_date,
        status: "booked",
      },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (existingBooking) {
      throw new customError.CustomAPIError("Slot already booked");
    }

    // 2. Create booking
    const booking = await Booking.create(
      {
        user_id: userId,
        pitch_id,
        slot_id,
        booking_date,
        status: "booked",
      },
      { transaction },
    );

    // 3. Commit
    await transaction.commit();

    return { data: booking, message: "Booking confirmed" };
  } catch (error) {
    await transaction.rollback();
    throw new customError.CustomAPIError(error.message);
  }
};

const reserveSlotService = async ({
  userId,
  pitch_id,
  slot_id,
  booking_date,
}) => {
  try {
    const key = `slot:${pitch_id}:${booking_date}:${slot_id}`;

    // Try reserving (only if not exists)
    const result = await redisClient.set(key, JSON.stringify({ userId }), {
      NX: true, // Only set if not exists
      EX: 60, // Expire in 60 sec
    });

    if (!result) {
      return {
        success: false,
        message: "Slot is already reserved temporarily",
      };
    }

    const { getIO } = require("../../socket");
    const io = getIO();
    const room = `slots:${pitch_id}:${booking_date}`;
    io.to(room).emit("slot_reserved", {
      slot_id,
      pitch_id,
      booking_date,
    });

    return {
      success: true,
      message: "Slot reserved for 1 minute",
    };
  } catch (error) {
    throw new customError.CustomAPIError("Error reserving slot");
  }
};

module.exports = {
  myBookingService,
  confirmBookingService,
  reserveSlotService,
};

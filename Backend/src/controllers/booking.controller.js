const {
  myBookingService,
  confirmBookingService,
  reserveSlotService,
} = require("../services/booking.service");

const myBooking = async (req, res) => {
  const data = await myBookingService(req.user.userId);
  res.json({ data });
};

const confirmBooking = async (req, res) => {
  const { message, data } = await confirmBookingService({
    userId: req.user.userId,
    pitch_id: req.body.pitch_id,
    slot_id: req.body.slot_id,
    booking_date: req.body.booking_date,
  });
  res.json({ message, data });
};

const reserveSlot = async (req, res) => {
  const { message, data } = await reserveSlotService({
    userId: req.user.userId,
    pitch_id: req.body.pitch_id,
    slot_id: req.body.slot_id,
    booking_date: req.body.booking_date,
  });
  res.json({ message: "Slot reserved" });
};

module.exports = { myBooking, confirmBooking, reserveSlot };

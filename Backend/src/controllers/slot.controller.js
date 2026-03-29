const { getSlotsService } = require("../services/slot.service");

const slots = async (req, res) => {
  const { pitchId, bookingDate } = req.query;
  const slots = await getSlotsService(pitchId, bookingDate);
  res.json({ message: "Slots retrieved", data: slots });
};

module.exports = { slots };

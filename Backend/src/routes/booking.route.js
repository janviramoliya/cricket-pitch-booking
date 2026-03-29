const express = require("express");
const router = express.Router();
const {
  myBooking,
  reserveSlot,
  confirmBooking,
} = require("../controllers/booking.controller");

router.get("/my-booking", myBooking);
router.post("/reserve-slot", reserveSlot);
router.post("/confirm-booking", confirmBooking);

module.exports = router;

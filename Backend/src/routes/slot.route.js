const express = require("express");
const router = express.Router();
const { slots } = require("../controllers/slot.controller");

router.get("/", slots);

module.exports = router;

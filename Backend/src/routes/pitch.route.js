const express = require("express");
const router = express.Router();
const { getPitches } = require("../controllers/pitch.controller");

router.get("/", getPitches);

module.exports = router;

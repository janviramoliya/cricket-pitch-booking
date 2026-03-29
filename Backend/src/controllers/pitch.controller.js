const { getPitchesService } = require("../services/pitch.service");

const getPitches = async (req, res) => {
  const { message, data } = await getPitchesService();
  res.json({ message, data });
};

module.exports = { getPitches };

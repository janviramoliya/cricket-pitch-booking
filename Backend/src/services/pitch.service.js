const customError = require("../errors");
const Pitch = require("../models/pitch.model");

const getPitchesService = async () => {
  try {
    const pitches = await Pitch.findAll();
    if (pitches.length === 0) {
      throw new customError.NotFoundError("No pitches found");
    }
    return { success: true, message: "Pitches retrieved", data: pitches };
  } catch (error) {
    throw new customError.CustomAPIError("Failed to retrive pitches");
  }
};

module.exports = { getPitchesService };

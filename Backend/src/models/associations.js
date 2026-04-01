const User = require("./user.model");
const Pitch = require("./pitch.model");
const Slot = require("./slot.model");
const Booking = require("./booking.model");
const Session = require("./session.model");

// User & Session
User.hasMany(Session, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Session.belongsTo(User, {
  foreignKey: "userId",
});

// User & Booking
User.hasMany(Booking, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Booking.belongsTo(User, {
  foreignKey: "user_id",
});

// Pitch & Booking
Pitch.hasMany(Booking, {
  foreignKey: "pitch_id",
  onDelete: "CASCADE",
});

Booking.belongsTo(Pitch, {
  foreignKey: "pitch_id",
});

// Slot & Booking
Slot.hasMany(Booking, {
  foreignKey: "slot_id",
  onDelete: "CASCADE",
});

Booking.belongsTo(Slot, {
  foreignKey: "slot_id",
});

module.exports = {
  User,
  Pitch,
  Slot,
  Booking,
};

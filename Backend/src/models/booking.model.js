const { DataTypes } = require("sequelize");
const sequelize = require("../connect/connect");

const Booking = sequelize.define(
  "booking",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    pitch_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "pitch",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    slot_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "slot",
        key: "id",
      },
    },
    booking_date: { type: DataTypes.DATEONLY, allowNull: false },
    status: {
      type: DataTypes.ENUM("booked", "cancelled"),
      defaultValue: "booked",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["pitch_id", "slot_id", "booking_date"],
      },
    ],
    tableName: "booking",
  },
);

module.exports = Booking;

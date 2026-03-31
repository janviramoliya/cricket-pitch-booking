const { DataTypes } = require("sequelize");
const sequelize = require("../connect/connect");

const Pitch = sequelize.define(
  "pitch",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    price_per_hour: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "pitch",
  },
);

module.exports = Pitch;

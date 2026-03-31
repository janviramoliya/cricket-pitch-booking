const { DataTypes } = require("sequelize");
const sequelize = require("../connect/connect");

const Slot = sequelize.define(
  "slot",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { type: DataTypes.TIME, allowNull: false },
  },
  {
    tableName: "slot",
  },
);

module.exports = Slot;

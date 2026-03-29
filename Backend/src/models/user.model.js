const { DataTypes } = require("sequelize");
const sequelize = require("../connect/connect");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
    tableName: "user",
    timestamps: true,
    updatedAt: false,
  },
);

module.exports = User;

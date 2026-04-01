const { DataTypes } = require("sequelize");
const sequelize = require("../connect/connect");

const Session = sequelize.define(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "user", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    refresh_token_hashed: { type: DataTypes.STRING, allowNull: false },
    token_expiry: { type: DataTypes.DATE, allowNull: false },
    ip_address: { type: DataTypes.STRING, allowNull: false },
    is_revoked: { type: DataTypes.BOOLEAN, default: false, allowNull: false },
  },
  {
    tableName: "session",
    TimeStamps: true,
  },
);

module.exports = Session;

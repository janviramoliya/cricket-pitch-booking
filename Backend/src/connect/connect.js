const { Sequelize } = require("sequelize");

// Replace with your database credentials
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  //   "Janvi@2001",
  {
    host: process.env.DATABASE_URI,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
    logging: false,
  },
);

module.exports = sequelize;

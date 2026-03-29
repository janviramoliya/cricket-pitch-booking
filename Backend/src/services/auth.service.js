const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomError = require("../errors");

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user.dataValues) {
      throw new CustomError.UnauthenticatedError(
        "Invalid username or password",
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError.UnauthenticatedError(
        "Invalid username or password",
      );
    }

    return {
      success: true,
      message: "Login successful",
      data: { email: user.email, userId: user.id },
    };
  } catch (error) {
    throw new CustomError.CustomAPIError(error.message);
  }
};

const registerService = async (userData) => {
  try {
    const existingUser = await User.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new CustomError.BadRequestError("User already exists");
    }
    const newUser = await User.create(userData);
    return { success: true, message: "Registration successful", user: newUser };
  } catch (error) {
    throw new CustomError.CustomAPIError(error.message);
  }
};

module.exports = { loginService, registerService };

const { StatusCodes } = require("http-status-codes");
const { loginService, registerService } = require("../services/auth.service");
const { attachCookiesToResponse, isTokenValid } = require("../utils/jwt");
const { CustomAPIError, UnauthenticatedError } = require("../errors");

const getCurrentUser = async (req, res) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError("User is not logged in");
  }

  try {
    const { email, userId } = isTokenValid({ token });
    res.status(StatusCodes.OK).json({ email, userId });
  } catch (error) {
    throw new CustomAPIError("Error occured while getting current user");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { message, data } = await loginService(email, password);

  attachCookiesToResponse({ res, user: data });

  res.status(StatusCodes.OK).json({ message, data });
};

const register = async (req, res) => {
  const { message } = await registerService(req.body);
  res.status(StatusCodes.OK).json({ message });
};

const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = { login, register, logout, getCurrentUser };

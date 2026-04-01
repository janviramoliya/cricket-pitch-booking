const { StatusCodes } = require("http-status-codes");
const { loginService, registerService } = require("../services/auth.service");
const {
  attachCookiesToResponse,
  isTokenValid,
  hashToken,
} = require("../utils/jwt");
const {
  CustomAPIError,
  UnauthenticatedError,
  UnauthorizedError,
} = require("../errors");
const Session = require("../models/session.model");

const getRefreshToken = async (req, res) => {
  const token = req.signedCookies.refresh_token;

  if (!token) {
    throw new UnauthenticatedError("Refresh token is not present");
  }

  try {
    const hashedToken = hashToken(token);

    const session = await Session.findOne({
      refresh_token_hashed: hashedToken,
      is_revoked: false,
    });

    if (!session) {
      // revoke all sessions
      throw new UnauthorizedError("Session is not present");
    }

    if (new Date() > session.expires_at) {
      return new UnauthorizedError("Session is not present");
    }

    attachCookiesToResponse({
      res,
      token_type: "refresh_token",
      data: {
        userId: session.userId,
        email: session.email,
      },
      sessionId: session.id,
    });
    attachCookiesToResponse({
      res,
      token_type: "access_token",
      data: {
        userId: session.userId,
        email: session.email,
      },
    });
  } catch (error) {
    throw new CustomAPIError(
      "Error occurred while getting refresh token and access token",
    );
  }
};

const getCurrentUser = async (req, res) => {
  const token = req.signedCookies.access_token;

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

  attachCookiesToResponse({ res, token_type: "access_token", user: data });

  attachCookiesToResponse({
    res,
    token_type: "refresh_token",
    user: data,
  });

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

module.exports = { login, register, logout, getCurrentUser, getRefreshToken };

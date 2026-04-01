const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Session = require("../models/session.model");
// const

const createJWT = ({ payload }) => {
  console.log(process.env.JWT_LIFETIME);
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

const attachCookiesToResponse = ({ res, token_type, user, sessionId }) => {
  const token =
    token_type === "refresh_token"
      ? generateRefreshToken()
      : createJWT({ payload: user });

  if (token_type === "refresh_token") {
    // DB operation for storing refresh token in hash
    if (sessionId) {
      Session.update(
        {
          refresh_token_hashed: token,
        },
        {
          where: {
            id: sessionId,
          },
        },
      );
    } else {
      Session.create({
        userId: user.userId,
        refresh_token_hashed: hashToken(token),
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
        .then()
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const expiry =
    token_type === "refresh_token" ? 1000 * 60 * 60 * 24 : 1000 * 60 * 10;

  res.cookie(token_type, token, {
    httpOnly: true,
    expires: new Date(Date.now() + expiry),
    secure: process.env.NODE_ENV === "production",
    path: token_type === "refresh_token" ? "/api/v1/auth/refresh-token" : "/",
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  hashToken,
  attachCookiesToResponse,
};

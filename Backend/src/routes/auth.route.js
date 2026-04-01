const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  register,
  getCurrentUser,
  getRefreshToken,
} = require("../controllers/auth.controller");

router.get("/me", getCurrentUser);
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/refresh-token", getRefreshToken);

module.exports = router;

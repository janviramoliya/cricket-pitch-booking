const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  register,
  getCurrentUser,
} = require("../controllers/auth.controller");

router.get("/me", getCurrentUser);
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;

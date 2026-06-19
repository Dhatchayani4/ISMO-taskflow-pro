const validate = require("../middleware/validationMiddleware");

const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");

const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  register,
  login,
  logout,
  getProfile,
} = require("../controllers/authController");

const authLimiter = require("../middleware/rateLimiter");

router.post(
  "/register",
  registerValidation,
  validate,
  register
);
router.post(
  "/login",
  authLimiter,
  loginValidation,
  validate,
  login
);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);
module.exports = router;


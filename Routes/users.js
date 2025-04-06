const express = require("express");
const router = express.Router();
const {
  register,
  login,
  me,
  logout,
  updatePassword,
  verifyEmail,
  resendVerificationEmail
} = require("../Controllers/authControllerUsers");

const authentication = require("../Middleware/authenticationUsers");

// ✅ Public Routes
router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);

// ✅ Protected Routes (pakai middleware auth)
router.get("/me", authentication, me);
router.post("/logout", authentication, logout);
router.post("/update-password/:id", authentication, updatePassword);

module.exports = router;

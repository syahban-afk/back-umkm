const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  register,
  login,
  me,
  logout,
  verifyEmail,
  forgotPassword,
  updatePassword,
  uploadProfilePhoto,
} = require("../Controllers/authControllerUsers");
const authentication = require("../Middleware/authenticationUsers");

const storage = multer.diskStorage({
  destination: "public/img/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", authentication, me);
router.post("/logout", authentication, logout);

// Password Management Routes
router.post("/forgot-password", forgotPassword);
router.post("/update-password", authentication, updatePassword);

// Profile Management Routes
router.post(
  "/upload-profile-photo",
  authentication,
  upload.single("profilePhoto"),
  uploadProfilePhoto
);

// Email Verification Route
router.get("/verify/:token", verifyEmail);

module.exports = router;

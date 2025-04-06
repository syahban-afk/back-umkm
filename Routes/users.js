const express = require("express");
const router = express.Router();
const {
  register,
  login,
  me,
  logout,
  updatePassword,
  verifyEmail,
  resendVerificationEmail,
  uploadPhotoProfile,
  updateProfile
} = require("../Controllers/authControllerUsers");

const authentication = require("../Middleware/authenticationUsers");
const upload = require("../Middleware/uploadPhoto");

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);

router.get("/me", authentication, me);
router.post("/logout", authentication, logout);
router.patch("/update-password", authentication, updatePassword);
router.post("/upload-photo", authentication, upload.single("photo"), uploadPhotoProfile);
router.patch("/update-profile", authentication, updateProfile);

module.exports = router;

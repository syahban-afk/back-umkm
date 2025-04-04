require("dotenv").config();
const nodemailer = require("nodemailer");
const SibApiV3Sdk = require('sib-api-v3-sdk');
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const generateToken = require("../Config/generateToken");
const { comparePassword, hashPassword } = require("../Config/bcrypt");
const {
  errorResponse,
  successResponse,
  internalErrorResponse,
  notFoundResponse,
} = require("../Config/responseJson");
const { users } = require("../Models");

const { EMAIL_ADMIN, EMAIL_PASS, JWT_SECRET_KEY, BREVO_API_KEY } = process.env;

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        const user = await users.findByPk(req.body.id);
        if (!user) return cb(new Error("User not found"));
  
        const userFolder = `public/img/${user.name.replace(/\s+/g, '_')}`;
        if (!fs.existsSync(userFolder)) {
          fs.mkdirSync(userFolder, { recursive: true });
        }
        cb(null, userFolder);
      } catch (error) {
        cb(error);
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ 
    storage,
    limits: { fileSize: 4 * 1024 * 1024 }, // Batas ukuran file 4MB
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
      if (extName && mimeType) {
        return cb(null, true);
      } else {
        return cb(new Error("Only .png, .jpg, and .jpeg format allowed!"));
      }
    }
  });
  
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
      errorResponse(res, "User already exists", 400);
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });

    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    successResponse(res, "User registered successfully", userResponse, 201);
  } catch (error) {
    internalErrorResponse(res, error);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await users.findOne({ where: { email } });
    if (!user) {
      notFoundResponse(res, "User not found");
    }

    // Validate password
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      errorResponse(res, "Invalid password", 401);
    }

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = generateToken(user);
    successResponse(
      res,
      "Logged in successfully",
      {
        user: userResponse,
        token,
      },
      200
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    internalErrorResponse(res, error);
  }
}

async function me(req, res) {
  try {
    const user = await users.findByPk(req.user.id, {
      attributes: ["id", "name", "profilePhoto", "email", "Skills"],
    });
    if (!user) {
      errorResponse(res, "User not found", 404);
    }
    successResponse(res, "User fetched successfully", user, 200);
  } catch (error) {
    console.error("Error fetching user:", error);
    internalErrorResponse(res, error);
  }
}

async function logout(req, res) {
  try {
    successResponse(res, "Logged out successfully", null, 200);
  } catch (error) {
    console.error("Error logging out user:", error);
    internalErrorResponse(res, error);
  }
}

async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_ADMIN,
      pass: EMAIL_PASS,
    },
  });

  const url = `http://localhost:3000/api/users/verify/${token}`;
  await transporter.sendMail({
    to: email,
    subject: "Email Verification",
    html: `Click <a href="${url}">here</a> to verify your email.`,
  });
}

async function verifyEmail(req, res) {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    await User.update({ verified: true }, { where: { id: decoded.id } });
    successResponse(res, "Email verified successfully.", null, 200);
  } catch (error) {
    console.error("Invalid token", error);
    internalErrorResponse(res, error);
  }
}

// Fungsi untuk mengatur ulang kata sandi
async function forgotPassword  (req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return notFoundResponse(res, "user not found")

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: "1h" });
    await sendVerificationEmail(email, token);

    successResponse(res, "Password reset email sent.", 200)
  } catch (error) {
    internalErrorResponse(res, error)
  }
};

async function updatePassword (req, res) {
  const { id, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { id } });
    successResponse(res, "Password updated successfully.", 200)
  } catch (error) {
    internalErrorResponse(res, error)
  }
};

async function uploadProfilePhoto(req, res) {
    const { id } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
  
    try {
      const user = await users.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Hapus foto lama jika ada
      if (user.profilePhoto) {
        const oldPhotoPath = path.join(__dirname, '..', user.profilePhoto);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
  
      // Simpan path baru ke database
      const filePath = `/public/img/${user.name.replace(/\s+/g, '_')}/${req.file.filename}`;
      await users.update({ profilePhoto: filePath }, { where: { id } });
  
      return successResponse(res, "Profile photo uploaded successfully.", 200);
    } catch (error) {
      return internalErrorResponse(res, error);
    }
  }

module.exports = {
  register,
  login,
  me,
  logout,
  sendVerificationEmail,
  verifyEmail,
  forgotPassword,
  updatePassword,
  uploadProfilePhoto
};

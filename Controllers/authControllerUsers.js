require("dotenv").config();
const crypto = require("crypto");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const generateToken = require("../Config/generateToken");
const { comparePassword, hashPassword } = require("../Config/bcrypt");
const {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  internalErrorResponse,
} = require("../Config/responseJson");

const { users } = require("../Models");
const {
  BREVO_API_KEY,
  BASE_URL,
  EMAIL_ADMIN
} = process.env

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) return errorResponse(res, "User already exists", 400);

    const hashedPassword = await hashPassword(password);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
    });

    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
      to: [{ email, name }],
      sender: { email: EMAIL_ADMIN, name: "Bazma-Portfolio" },
      subject: "Verifikasi Email Akun",
      htmlContent: `
        <p>Hai ${name},</p>
        <p>Klik link berikut untuk verifikasi akunmu:</p>
        <a href="${BASE_URL}/verify/${verificationToken}">Verifikasi Sekarang</a>
      `,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    successResponse(
      res,
      "User registered successfully. Please verify your email.",
      userResponse,
      201
    );
  } catch (error) {
    internalErrorResponse(res, error);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ where: { email } });
    if (!user) return notFoundResponse(res, "User not found");

    if (!user.isVerified) {
      return errorResponse(res, "Email belum diverifikasi. Cek inbox kamu.", 403);
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) return errorResponse(res, "Invalid password", 401);

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = generateToken(user);
    successResponse(res, "Logged in successfully", { user: userResponse, token }, 200);
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

async function updatePassword(req, res) {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    if (!newPassword || newPassword.length < 6) {
      return validationErrorResponse(
        res,
        "Password harus minimal 6 karakter.",
        400
      );
    }

    const user = await users.findOne({ where: { id } });
    if (!user) {
      return notFoundResponse(res, "User tidak ditemukan", 404);
    }
    const hashedPassword = await hashPassword(newPassword);
    await users.update({ password: hashedPassword }, { where: { id } });
    successResponse(res, "Password berhasil diperbarui.", 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
}

async function verifyEmail(req, res) {
  try {
    const { token } = req.params;
    const user = await users.findOne({ where: { verificationToken: token } });

    if (!user) return notFoundResponse(res, "Token tidak valid", 404);

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    successResponse(res, "Email berhasil diverifikasi. Silakan login.", null, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
}

async function resendVerificationEmail(req, res) {
  const { email } = req.body;

  try {
    const user = await users.findOne({ where: { email } });
    if (!user) return notFoundResponse(res, "User tidak ditemukan", 404);

    if (user.isVerified) {
      return successResponse(res, "Email sudah diverifikasi", null, 200);
    }
    const newToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = newToken;
    await user.save();
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
      to: [{ email: user.email, name: user.name }],
      sender: { email: EMAIL_ADMIN, name: "Bazma-Potfolio" },
      subject: "Verifikasi Ulang Email",
      htmlContent: `
        <p>Halo ${user.name},</p>
        <p>Klik link berikut untuk verifikasi ulang akunmu:</p>
        <a href="${BASE_URL}/verify/${newToken}">Verifikasi Sekarang</a>
      `,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    successResponse(res, "Email verifikasi telah dikirim ulang", null, 200);
  } catch (error) {
    console.error("Error resending verification email:", error);
    internalErrorResponse(res, error);
  }
}



module.exports = {
  register,
  login,
  me,
  logout,
  updatePassword,
  verifyEmail,
  resendVerificationEmail
};

import express from "express";
import {
  registerUser,
  verifyEmailOtp,
  resendEmailOtp,
  loginUser,
  forgotPassword,
  resetPassword,
  refreshSessionToken,
  logoutSession,
  changePassword,

} from "../controllers/userController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* SIGNUP */
router.post("/register", registerUser);

/* OTP (single page for signup + reset) */

router.post("/verify-email-otp", verifyEmailOtp);

router.post("/resend-otp", resendEmailOtp);

/* AUTH */

router.post("/login", loginUser);

/* PASSWORD RESET */

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

/* PASSWORD CHANGE */

router.post("/change-password", authMiddleware, changePassword);

/* SESSION */

router.post("/refresh-token", refreshSessionToken);
router.post("/logout", logoutSession);

export default router;

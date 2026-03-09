



//============updated full code -====

import jwt from "jsonwebtoken";
import crypto from "crypto";
import * as UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import { sendEmail } from "../utils/mailer.js";
const SALT_ROUNDS = 12;

/* ============================================================
 * OTP EMAIL TEMPLATE
 * ============================================================
 */
function otpEmailTemplate({ otp }) {
  const year = new Date().getFullYear();

 return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Your OTP Code</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: #F4F6F8;
  font-family: Arial, Helvetica, sans-serif;
">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="420" cellpadding="0" cellspacing="0" style="
          background-color: #FFFFFF;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          overflow: hidden;
        ">
          <tr>
            <td style="
              background-color: #4F46E5;
              color: #FFFFFF;
              text-align: center;
              padding: 14px;
              font-size: 16px;
              font-weight: 600;
            ">
              Your OTP Code
            </td>
          </tr>

          <tr>
            <td style="padding: 24px; font-size: 13px; color: #333333;">
              <p style="margin-top: 0;">Hello,</p>

              <p>
                Your One-Time Password (OTP) for account verification is:
              </p>

              <div style="
                background-color: #F3F4F6;
                border-radius: 6px;
                text-align: center;
                padding: 12px;
                margin: 16px 0;
              ">
                <span style="
                  font-size: 20px;
                  font-weight: 600;
                  color: #4F46E5;
                  letter-spacing: 2px;
                ">
                  ${otp}
                </span>
              </div>

              <p style="font-size: 12px; color: #555555;">
                This OTP is valid for <strong>10 minutes</strong>.
                Please do not share this code with anyone.
              </p>

              <p style="font-size: 12px; color: #555555;">
                If you didn't request this code, please ignore this email.
              </p>

              <p style="font-size: 12px; margin-top: 16px;">
                Thank you for using our service!
              </p>
            </td>
          </tr>

          <tr>
            <td style="
              background-color: #F8F9FA;
              text-align: center;
              padding: 10px;
              font-size: 11px;
              color: #888888;
            ">
              © ${year} All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

/* ============================================================
 * ADMIN EMAIL TEMPLATE
 * ============================================================
 */
function adminRegistrationTemplate(data) {
  return `
  <h2>New Early Bird Registration</h2>

  <p>A new user has registered.</p>

  <h3>Details:</h3>

  <p><b>BAR No:</b> ${data.barregno}</p>
  <p><b>Name:</b> ${data.full_name}</p>
  <p><b>Phone:</b> ${data.phone}</p>
  <p><b>Email:</b> ${data.email}</p>
  `;
}



export const registerUserService = async ({
  barregno,
  full_name,
  email,
  phone_no,
  password
}) => {

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const query = `
    SELECT * FROM early_register_user($1,$2,$3,$4,$5)
  `;

  const values = [
    barregno,
    full_name,
    email,
    phone_no,
    hashedPassword
  ];

  const result = await pool.query(query, values);

  const data = result.rows[0]?.early_register_user;

  console.log("REGISTER DB RESULT:", data);

  if (!data?.success) {
    return data;
  }

  const otp = data.otp;

  console.log("OTP GENERATED:", otp);
  console.log("EMAIL:", email);

  /* SEND OTP EMAIL */
  await sendEmail(
    email,
    "Your OTP Code",
    otpEmailTemplate({ otp })
  );

  /* ADMIN EMAIL */
  await sendEmail(
    "dipakanilshinde2002@gmail.com",
    "New Early Bird Registration",
    adminRegistrationTemplate({
      barregno,
      full_name,
      email,
      phone: phone_no
    })
  );

  return {
    success: true,
    registration_id: data.registration_id,
    message: "Verification OTP sent to your email"
  };
};
/* ================= VERIFY OTP ================= */
export async function verifyEmailOtpService(email, otp) {
  const r = await UserModel.verifyEmailOtpByEmail(email, otp);
  const d = r.rows[0]?.verify_email_otp_by_email;

  if (!d?.success) {
    return { success: false, message: "Invalid or expired OTP" };
  }

  if (d.purpose === "reset") {
    const resetToken = crypto.randomBytes(32).toString("hex");
    await UserModel.storeResetToken(email, resetToken);

    return {
      success: true,
      reset_token: resetToken,
      next: "reset-password"
    };
  }

  return {
    success: true,
    next: "login",
    message: "Email verified successfully"
  };
}




export async function loginUserService(data) {

  const r = await UserModel.loginUser(data.login);

  // get json returned from postgres
  let u = r.rows[0]?.login_user;

  // if postgres returns string JSON
  if (typeof u === "string") {
    u = JSON.parse(u);
  }

  console.log("DB LOGIN RESULT:", u);

  if (!u || !u.success) {
    return { success: false, message: "Invalid credentials" };
  }

  const isMatch = await bcrypt.compare(
    data.password,
    u.password_hash
  );

  if (!isMatch) {
    return {
      success: false,
      message: "Invalid login credentials"
    };
  }

  const token = jwt.sign(
    {
      sub: u.user_id,
      email: u.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  const sessionToken = crypto.randomBytes(32).toString("hex");

  await UserModel.createUserSession(
    u.user_id,
    sessionToken,
    data.userAgent || null,
    data.ipAddress || null,
    data.deviceName || null,
    data.deviceFingerprint || null
  );

  return {
    success: true,
    token,
    session_token: sessionToken,
    user_id: u.user_id
  };
}

/* ================= RESEND OTP ================= */
export async function resendEmailOtpService(email) {

  const r = await UserModel.resendEmailOtp(email);
  const d = r.rows[0]?.resend_email_otp;

  if (!d?.otp) {
    return {
      success: false,
      message: "Failed to resend OTP"
    };
  }

  // send email with new OTP
  await sendEmail(
    email,
    "Your OTP Code",
    otpEmailTemplate({ otp: d.otp })
  );

  return {
    success: true,
    message: "OTP resent successfully"
  };
}


//* ================= FORGOT PASSWORD ================= */
/* ================= FORGOT PASSWORD ================= */
export async function forgotPasswordService(email) {

  const r = await UserModel.forgotPassword(email);
  const d = r.rows[0]?.forgot_password_send_otp;

  if (!d?.otp) {
    return {
      success: false,
      message: "Failed to send OTP"
    };
  }

  // send OTP email
  await sendEmail(
    email,
    "Your OTP Code",
    otpEmailTemplate({ otp: d.otp })
  );

  return {
    success: true,
    message: "OTP sent to your email"
  };
}



/* ================= RESET PASSWORD ================= */
export async function resetPasswordService(resetToken, newPassword) {

  if (!resetToken || !newPassword) {
    return {
      success: false,
      message: "reset_token and newPassword are required"
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  const r = await UserModel.resetPasswordByToken(resetToken, hashedPassword);

  const d = r.rows[0]?.reset_password_by_token;

  if (!d || !d.success) {
    return {
      success: false,
      message: "Invalid or expired reset token"
    };
  }

  return {
    success: true,
    message: "Password reset successful"
  };
}



//logout and session management functions would go here (not included in this snippet)
export async function logoutSessionService(sessionToken) {

  if (!sessionToken) {
    return {
      success: false,
      message: "session_token is required"
    };
  }

  const r = await UserModel.logoutSession(sessionToken);
  const d = r.rows[0]?.logout_session;

  if (!d?.success) {
    return {
      success: false,
      message: "Logout failed"
    };
  }

  return {
    success: true,
    message: "Logged out successfully"
  };
}



//change password function
/* ================= CHANGE PASSWORD ================= */
export async function changePasswordService(userId, currentPassword, newPassword) {

  // get current password hash
  const r = await UserModel.getUserPasswordById(userId);
  const user = r.rows[0];

  if (!user) {
    return {
      success: false,
      message: "User not found"
    };
  }

  // check current password
  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password_hash
  );

  if (!isMatch) {
    return {
      success: false,
      message: "Current password is incorrect"
    };
  }

  // hash new password
  const newHash = await bcrypt.hash(newPassword, 12);

  // update password
  await UserModel.updateUserPassword(userId, newHash);

  // delete old sessions
  await UserModel.deleteUserSessions(userId);

  return {
    success: true,
    message: "Password changed successfully"
  };
}

export async function refreshSessionTokenService(refreshToken) {
  const r = await UserModel.refreshSessionToken(refreshToken);
  return r.rows[0];
}




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

  await pool.query(`
  INSERT INTO otp_store (email, otp, purpose, expires_at)
  VALUES ($1, $2, $3, NOW() + INTERVAL '10 minutes')
`, [email, otp, "signup"]);
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
export async function verifyEmailOtpService(email, otp, purpose = "signup") {

  console.log("INPUT EMAIL:", email);
  console.log("INPUT OTP:", otp);

  const otpCheck = await pool.query(`
  SELECT *
  FROM otp_store
  WHERE email = $1
    AND otp = $2
    AND purpose = $3
    AND expires_at > NOW()
  ORDER BY created_at DESC
  LIMIT 1
`, [email, otp.toString(), purpose || "signup"]);
  console.log("DB OTP RESULT:", otpCheck.rows);

  const d = otpCheck.rows[0];

  if (!d) {
    return { success: false, message: "Invalid or expired OTP" };
  }

  // ================= REGISTER FLOW =================
  if (purpose !== "reset") {

    const userInsert = await pool.query(`
      INSERT INTO users (
        email, phone_no, first_name, last_name, education, bar_reg_no
      )
      SELECT 
        email, phone_no, full_name, '',
        'Not Provided',
        barregno
      FROM earlybirdregistration
      WHERE email = $1
      RETURNING user_id
    `, [email]);

    const user = userInsert.rows[0];

    const passRes = await pool.query(`
      SELECT password_hash 
      FROM earlybirdregistration 
      WHERE email = $1
    `, [email]);

    const hashedPassword = passRes.rows[0]?.password_hash;

    await pool.query(
      `INSERT INTO logins (user_id, password)
       VALUES ($1, $2)`,
      [user.user_id, hashedPassword]
    );
  }

  // ================= RESET FLOW =================
  if (purpose === "reset") {
    const resetToken = crypto.randomBytes(32).toString("hex");

    await pool.query(`
  INSERT INTO reset_tokens (email, reset_token, used, expires_at)
  VALUES ($1, $2, false, NOW() + INTERVAL '1 hour')
`, [email, resetToken]);

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

  const loginInput = data.login || data.email;

  if (!loginInput) {
    return { success: false, message: "Email is required" };
  }

  if (!data.password) {
    return { success: false, message: "Password is required" };
  }

  console.log("🔎 Searching for user:", loginInput);

  const userCheck = await pool.query(
    `SELECT 
      u.user_id,
      u.email,
      u.phone_no,
      l.password
   FROM users u
   JOIN logins l ON u.user_id = l.user_id
   WHERE (u.email = $1 OR u.phone_no = $1)
     AND u.is_active = true
   LIMIT 1`,
    [loginInput]
  );

  const u = userCheck.rows[0];
  console.log("USER RECORD:", u);
  if (!u) {
    return { success: false, message: "Invalid email or password" };
  }

  const isMatch = await bcrypt.compare(data.password, u.password);

  if (!isMatch) {
    return {
      success: false,
      message: "Invalid login credentials",
    };
  }

  const token = jwt.sign(
    {
      sub: u.user_id,
      email: u.email,
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
    user_id: u.user_id,
    message: "Login successful",
  };
}

/* ================= RESEND OTP ================= */
export async function resendEmailOtpService(email) {

  if (!email) {
    return {
      success: false,
      message: "Email is required"
    };
  }

  const r = await UserModel.resendEmailOtp(email);

  const d = r.rows[0]?.resend_email_otp;

  console.log("DB RESULT:", d);

  if (!d?.otp) {
    return {
      success: false,
      message: "Failed to resend OTP"
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

  const otp = d.otp;

  // ✅ INSERT INTO otp_store (RESET PURPOSE)
  await pool.query(`
    INSERT INTO otp_store (email, otp, purpose, expires_at)
    VALUES ($1, $2, $3, NOW() + INTERVAL '10 minutes')
  `, [email, otp, "reset"]);

  // ✅ send OTP email
  await sendEmail(
    email,
    "Your OTP Code",
    otpEmailTemplate({ otp })
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

  try {
    // ✅ STEP 1: validate token
    const tokenData = await pool.query(`
      SELECT email
      FROM reset_tokens
      WHERE reset_token = $1
        AND expires_at > NOW()
        AND used = false
      LIMIT 1
    `, [resetToken]);

    const email = tokenData.rows[0]?.email;

    if (!email) {
      return {
        success: false,
        message: "Invalid or expired reset token"
      };
    }

    // ✅ STEP 2: get user_id
    const userRes = await pool.query(`
      SELECT user_id FROM users WHERE email = $1
    `, [email]);

    const userId = userRes.rows[0]?.user_id;

    if (!userId) {
      return {
        success: false,
        message: "User not found"
      };
    }

    // 🔐 STEP 3: hash password
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // ✅ STEP 4: update logins table (MAIN FIX)
    await pool.query(`
      UPDATE logins
      SET password = $1
      WHERE user_id = $2
    `, [hashedPassword, userId]);

    // ✅ STEP 5: mark token used
    await pool.query(`
      UPDATE reset_tokens
      SET used = true
      WHERE reset_token = $1
    `, [resetToken]);

    // ✅ STEP 6: delete sessions
    await UserModel.deleteUserSessions(userId);

    return {
      success: true,
      message: "Password reset successful"
    };

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return {
      success: false,
      message: "Something went wrong during password reset"
    };
  }
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

export async function refreshSessionTokenService(refreshToken, userAgent, ip) {

  const r = await UserModel.refreshSessionToken(
    refreshToken,
    userAgent,
    ip
  );

  const d = r.rows[0]?.refresh_session_token;

  if (!d?.success) {
    return {
      success: false,
      message: "Token refresh failed"
    };
  }

  return {
    success: true,
    token: d.token,
    session_token: d.session_token
  };
}
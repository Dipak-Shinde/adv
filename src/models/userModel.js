import { pool } from "../config/db.js";

//register user with email otp
export const registerUser = (d) =>
  pool.query(
    "SELECT * FROM  early_register_user($1,$2,$3,$4,$5)",
    [
     d.barregno,
      d.full_name,
      d.email,
     d.phone_no,
      d.password
    ]
  );

  //verify email otp for registration
export const verifyEmailOtpByEmail = (email, otp) =>
  pool.query(
    "SELECT * FROM verify_email_otp_by_email($1,$2)",
    [email, otp]
  );

//resend email otp for registration
export function resendEmailOtp(email) {
  return pool.query(
    "SELECT * FROM resend_email_otp($1)",
    [email]
  );
}


export const loginUser = (login) =>
  pool.query(
    "SELECT login_user($1)",
    [login]
  );


//* GET USER ROLE ID BY USER ID */
export const createUserSession = (...a) =>
  pool.query("SELECT * FROM create_user_session($1,$2,$3,$4,$5,$6)", a);


// Forgot password - send OTP to email
export const forgotPassword = (email) =>
  pool.query("SELECT * FROM forgot_password_send_otp($1)", [email]);

//* CHANGE PASSWORD (WITH OTP) */
export const storeResetToken = (email, token) =>
  pool.query("SELECT * FROM store_reset_token($1,$2)", [email, token]);


// Reset password using the reset token (for forgot password flow)
export function resetPasswordByToken(resetToken, newPassword) {
  return pool.query(
    "SELECT * FROM reset_password_by_token($1, $2)",
    [String(resetToken).trim(), newPassword]
  );
}

// // Get user's current password hash by user ID (for change password flow)
// export const getUserPasswordById = (userId) =>
//   pool.query(
//     "SELECT password_hash FROM users WHERE user_id = $1",
//     [userId]
//   );
// //* UPDATE USER PASSWORD */
// export const updateUserPassword = (userId, passwordHash) =>
//   pool.query(
//     "UPDATE users SET password_hash = $1, updated_at = NOW() WHERE user_id =$2",
//     [passwordHash, userId]
//   );
//* DELETE USER SESSIONS (ON PASSWORD CHANGE) */
export const deleteUserSessions = (userId) =>
  pool.query(
    "DELETE FROM user_sessions WHERE user_id = $1",
    [userId]
  );


//* REFRESH SESSION TOKEN */
export const refreshSessionToken = (...a) =>
  pool.query("SELECT * FROM refresh_session_token($1,$2,$3)", a);

//* LOGOUT */
export const logoutSession = (token) =>
  pool.query("SELECT * FROM logout_session($1)", [token]);

//* GET USER ROLE ID BY USER ID */
export function getUserRoleIdByUserId(userId) {
  return pool.query(
    `
    SELECT role_id
    FROM public.users
    WHERE user_id = $1
      AND is_active = true
    `,
    [userId]
  );
}

//
// Get user's current password hash
export const getUserPasswordById = (userId) =>
  pool.query(
    "SELECT password_hash FROM earlybirdregistration WHERE earlybirdregistration_id = $1",
    [userId]
  );

// Update password
export const updateUserPassword = (userId, passwordHash) =>
  pool.query(
    "UPDATE earlybirdregistration SET password_hash = $1 WHERE earlybirdregistration_id =$2",
    [passwordHash, userId]
  );

//


//
export const insertLoginHistory = (userId, mobile, ip) =>
  pool.query(
    `INSERT INTO logins
     (user_id, mobileno, ipaddress, lastlogin, created_at)
     VALUES ($1,$2,$3,NOW(),NOW())`,
    [userId, mobile, ip]
  );
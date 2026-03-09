//`src/models/profileModel.js`

import { pool } from "../config/db.js";
// Get user profile information by user ID
export function getUserProfile(userId) {
  return pool.query(
    "SELECT * FROM fn_get_user_profile($1)",
    [userId]
  );
}
// Update user profile information (full name, phone, about me)
export function updateUserProfile(userId, data) {
  const { full_name, phone, about_me } = data;

  return pool.query(
    "SELECT fn_update_user_profile($1,$2,$3,$4) AS success",
    [userId, full_name, phone, about_me]
  );
}
// Update user avatar URL
export function updateAvatar(userId, avatarUrl) {
  return pool.query(
    "SELECT fn_update_profile_avatar($1,$2) AS success",
    [userId, avatarUrl]
  );
}

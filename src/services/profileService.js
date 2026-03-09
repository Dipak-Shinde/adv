import * as ProfileModel from "../models/profileModel.js";
//
export async function getUserProfileService(userId) {
  const result = await ProfileModel.getUserProfile(userId);

  if (!result.rows.length) {
    return { success: false };
  }

  return {
    success: true,
    profile: result.rows[0]
  };
}

// Update user profile information (full name, phone, about me)
export async function updateProfileService(userId, data) {
  const result = await ProfileModel.updateUserProfile(userId, data);
  return result.rows[0].success;
}

// Upload user avatar
export async function updateAvatarService(userId, avatarUrl) {
  const result = await ProfileModel.updateAvatar(userId, avatarUrl);
  return result.rows[0].success;
}

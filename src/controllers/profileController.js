import * as ProfileService from "../services/profileService.js";
//* GET USER PROFILE */
export async function getProfile(req, res) {
  try {
    const userId = req.user.sub;

    const data = await ProfileService.getUserProfileService(userId);

    if (!data.success) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      profile: data.profile
    });
  // } catch (err) {
  //   console.error("getProfile error:", err);
  //   res.status(500).json({ success: false, message: "Server error" });
  // }
  } catch (err) {
  console.error("PROFILE ERROR:", err);
  res.status(500).json({
    success: false,
    error: err.message
  });
}

}

//* UPDATE USER PROFILE */
export async function updateProfile(req, res) {
  try {
    const userId = req.user.sub;

    const allowed = ["full_name", "phone", "about_me"];
    const cleanData = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    );

    console.log("UPDATE PROFILE BODY:", req.body);
    console.log("USER ID:", req.user.sub);


    if (!Object.keys(cleanData).length) {
      return res.status(400).json({
        success: false,
        message: "No valid data provided"
      });
    }

    const success = await ProfileService.updateProfileService(
      userId,
      cleanData
    );

    res.json({
      success,
      message: success ? "Profile updated" : "Update failed"
    });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Upload user avatar
export async function uploadAvatar(req, res) {
  try {
    const userId = req.user.sub;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    const avatarUrl = `/uploads/profile/${req.file.filename}`;

    await ProfileService.updateAvatarService(userId, avatarUrl);

    res.json({
      success: true,
      avatar: avatarUrl
    });
  } catch (err) {
    console.error("uploadAvatar error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

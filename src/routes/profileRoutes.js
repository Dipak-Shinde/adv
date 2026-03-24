import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  getProfile,
  updateProfile,
  uploadAvatar
} from "../controllers/profileController.js";

const router = express.Router();
//* GET USER PROFILE */
router.get("/me", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);
router.post("/avatar", authMiddleware, upload.single("avatar"), uploadAvatar);

export default router;

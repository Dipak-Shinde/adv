import express from "express";
import { getSideMenu } from "../controllers/sidemenuController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
// Get side menu items based on user role
router.get("/", authMiddleware, getSideMenu);

export default router;
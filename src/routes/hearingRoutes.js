import express from "express";
import * as hearingController from "../controllers/hearingController.js";

const router = express.Router();

// Create hearing
router.post("/create", hearingController.createHearing);

// Get all hearings for a user
router.get("/all/:user_id", hearingController.getAllHearings);

// Dropdowns – put **specific routes first**
router.get("/case-types", hearingController.getCaseTypes);
router.get("/clients-dropdown/:user_id", hearingController.getClientsForHearing);

// Get hearing by ID – dynamic route **last**
router.get("/:hearing_id", hearingController.getHearingById);

// Update hearing
router.put("/update", hearingController.updateHearing);

// Delete hearing
router.delete("/delete/:hearing_id", hearingController.deleteHearing);

export default router;
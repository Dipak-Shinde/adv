import express from "express";
import * as appointmentController from "../controllers/calenderController.js";

const router = express.Router();

router.post("/create", appointmentController.createAppointment);

export default router;
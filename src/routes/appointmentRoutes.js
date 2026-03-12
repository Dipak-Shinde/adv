import express from "express";
import * as appointmentController from "../controllers/appointmentController.js";

const router = express.Router();

// Fixed paths first
router.get("/case-types", appointmentController.getCaseTypesDropdown);
router.get("/clients-dropdown/:user_id", appointmentController.getClientsForAppointment);
router.get("/all/:user_id", appointmentController.getAllAppointments);
router.post("/create", appointmentController.createAppointment);
router.put("/update", appointmentController.updateAppointment);
router.delete("/delete/:appointment_id", appointmentController.deleteAppointment);

// Dynamic route last
router.get("/:appointment_id", appointmentController.getAppointmentById);

export default router;
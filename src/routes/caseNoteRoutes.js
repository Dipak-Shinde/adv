import express from "express";
import * as caseNoteController from "../controllers/caseNoteController.js";

const router = express.Router();

router.post("/create", caseNoteController.createCaseNote);

router.get("/all/:user_id", caseNoteController.getAllCaseNotes);

router.get("/clients/:user_id", caseNoteController.getClientsDropdown);

router.get("/cases/:client_id", caseNoteController.getCasesByClient);

router.put("/update", caseNoteController.updateCaseNote);

router.delete("/delete/:note_id", caseNoteController.deleteCaseNote);

/* ALWAYS KEEP THIS LAST */
router.get("/:note_id", caseNoteController.getCaseNoteById);

export default router;
import express from "express";
import * as documentController from "../controllers/clientDocumentController.js";

const router = express.Router();

router.post("/create", documentController.createDocument);

router.get("/all/:user_id", documentController.getAllDocuments);

router.get("/clients-dropdown/:user_id", documentController.getClients);
router.get("/cases-dropdown/:client_id", documentController.getCases);

router.put("/update", documentController.updateDocument);

router.delete("/delete/:document_id", documentController.deleteDocument);

// safer route
router.get("/get/:document_id", documentController.getDocumentById);

export default router;
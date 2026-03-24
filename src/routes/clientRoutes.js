import express from "express";
import {
  AddClient,
  ClientList,
  ViewClientDetails,
  EditClient,
  DeleteClient
} from "../controllers/clientController.js";

const router = express.Router();

/* ================= CLIENT ROUTES ================= */

router.post("/add-client", AddClient);

router.get("/client-list/:user_id", ClientList);

router.get("/view-client/:id", ViewClientDetails);

router.put("/edit-client/:id", EditClient);

router.delete("/delete-client/:id", DeleteClient);

export default router;
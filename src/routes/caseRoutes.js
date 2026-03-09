import express from "express";
import {
  AddCase,
  CaseList,
  ViewCaseDetails,
  EditCase,
  DeleteCase
} from "../controllers/caseController.js";

const router = express.Router();


router.post("/add-case", AddCase);

router.get("/case-list", CaseList);

router.get("/view-case/:id", ViewCaseDetails);

router.put("/edit-case/:id", EditCase);

router.delete("/delete-case/:id", DeleteCase);


export default router;
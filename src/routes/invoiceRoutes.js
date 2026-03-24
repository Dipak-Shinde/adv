import express from "express";
import * as invoiceController from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/create", invoiceController.createInvoice);
router.get("/all/:user_id", invoiceController.getAllInvoices);   // FIRST
router.get("/:invoice_id", invoiceController.getInvoice);        // LAST
router.put("/update/:invoice_id", invoiceController.updateInvoice);



router.post("/payment", invoiceController.createInvoicePayment);

export default router;
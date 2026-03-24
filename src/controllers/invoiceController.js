import * as invoiceService from "../services/invoiceService.js";

/* CREATE */
export const createInvoice = async (req, res) => {
  try {
   
    const result = await invoiceService.createInvoiceService(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("CREATE INVOICE ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
export const getAllInvoices = async (req, res) => {
  try {
    const result = await invoiceService.getAllInvoicesService(
      req.params.user_id
    );
    res.json(result);
  } catch (error) {
    console.error("GET ALL ERROR:", error);
    res.status(500).json({ success: false });
  }
};
/* GET BY ID */
export const getInvoice = async (req, res) => {
  try {
    const result = await invoiceService.getInvoiceService(req.params.invoice_id);
    res.json(result);
  } catch (error) {
    console.error("GET INVOICE ERROR:", error);
    res.status(500).json({ success: false });
  }
};

/* UPDATE */
export const updateInvoice = async (req, res) => {
  try {
    const result = await invoiceService.updateInvoiceService(
      req.params.invoice_id,
      req.body
    );
    res.json(result);
  } catch (error) {
    console.error("UPDATE INVOICE ERROR:", error);
    res.status(500).json({ success: false });
  }
};

/* PAYMENT */
export const createInvoicePayment = async (req, res) => {
  try {
    const result = await invoiceService.createInvoicePaymentService(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    res.status(500).json({ success: false });
  }
};
//
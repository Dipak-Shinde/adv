import * as InvoiceModel from "../models/invoiceModel.js";
import { pool } from "../config/db.js";

export const createInvoiceService = async (data) => {
      console.log("SERVICE DATA:", data);
  const r = await InvoiceModel.createInvoice(data);
  return r.rows[0].fn_create_invoice;
};
export const getInvoiceService = async (invoice_id) => {
  const r = await InvoiceModel.getInvoiceById(invoice_id);
  return r.rows[0].fn_get_invoice;
};

export const getAllInvoicesService = async (user_id) => {
  const r = await pool.query(
    `SELECT * FROM invoices WHERE user_id = $1 ORDER BY invoice_id DESC`,
    [user_id]
  );

  return {
    success: true,
    data: r.rows
  };
};

export const updateInvoiceService = async (invoice_id, data) => {
  const r = await InvoiceModel.updateInvoice(invoice_id, data);
  return r.rows[0].fn_update_invoice;
};

export const createInvoicePaymentService = async (data) => {
  const r = await InvoiceModel.createInvoicePayment(data);
  return r.rows[0].fn_create_invoice_payment;
};
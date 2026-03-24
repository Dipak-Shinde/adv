import { pool } from "../config/db.js";

export const createInvoice = (data) => {
  return pool.query(
    "SELECT fn_create_invoice($1::jsonb)",
    [JSON.stringify(data)]
  );
};



export const getInvoiceById = (invoice_id) => {
  return pool.query(
    `SELECT fn_get_invoice($1)`,
    [invoice_id]
  );
};

export const updateInvoice = (invoice_id, data) => {
  return pool.query(
    `SELECT fn_update_invoice($1, $2)`,
    [invoice_id, data]
  );
};

export const createInvoicePayment = (data) => {
  return pool.query(
    `SELECT fn_create_invoice_payment($1)`,
    [data]
  );
};
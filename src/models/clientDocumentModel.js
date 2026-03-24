import {  pool } from "../config/db.js";

export const insertDocument = async (data) => {
  const query = `
  SELECT fn_insert_client_document(
  $1,$2,$3,$4,$5,$6,$7
  )`;

  const values = [
    data.user_id,
    data.client_id,
    data.case_id,
    data.document_title,
    data.document_note,
    data.document_url,
    data.created_by
  ];

  const result = await pool.query(query, values);
  return result.rows[0].fn_insert_client_document;
};

export const getAllDocuments = async (user_id) => {
  const result = await pool.query(
    `SELECT fn_get_all_documents($1)`,
    [user_id]
  );
  return result.rows[0].fn_get_all_documents;
};

export const getDocumentById = async (document_id) => {
  const result = await pool.query(
    `SELECT fn_get_document_by_id($1)`,
    [document_id]
  );
  return result.rows[0].fn_get_document_by_id;
};

export const updateDocument = async (data) => {
  const result = await pool.query(
    `SELECT fn_update_client_document($1,$2,$3,$4,$5)`,
    [
      data.document_id,
      data.document_title,
      data.document_note,
      data.document_url,
      data.updated_by
    ]
  );

  return result.rows[0].fn_update_client_document;
};

export const deleteDocument = async (document_id) => {
  const result = await pool.query(
    `SELECT fn_delete_client_document($1)`,
    [document_id]
  );

  return result.rows[0].fn_delete_client_document;
};

export const getClients = async (user_id) => {
  const result = await pool.query(
    `SELECT fn_get_clients_for_documents($1)`,
    [user_id]
  );

  return result.rows[0].fn_get_clients_for_documents;
};

export const getCases = async (client_id) => {
  const result = await pool.query(
    `SELECT fn_get_cases_for_documents($1)`,
    [client_id]
  );

  return result.rows[0].fn_get_cases_for_documents;
};
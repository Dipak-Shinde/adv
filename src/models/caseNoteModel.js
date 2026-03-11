import { pool } from "../config/db.js";

export const insertCaseNote = async (data) => {
  const query = `SELECT fn_insert_case_note($1,$2,$3,$4,$5,$6,$7)`;

  const values = [
    data.user_id,
    data.client_id,
    data.case_id,
    data.note_title,
    data.note_description,
    data.followup_date,
    data.created_by
  ];

  const result = await pool.query(query, values);
  return result.rows[0].fn_insert_case_note;
};

export const getAllCaseNotes = async (user_id) => {
  const result = await pool.query(
    `SELECT (fn_get_all_case_notes($1)) AS data`,
    [user_id]
  );

  return result.rows[0].data;
};

export const getCaseNoteById = async (note_id) => {
  const result = await pool.query(
    `SELECT fn_get_case_note_by_id($1)`,
    [note_id]
  );

  return result.rows[0].fn_get_case_note_by_id;
};

export const updateCaseNote = async (data) => {
  const query = `SELECT fn_update_case_note($1,$2,$3,$4,$5)`;

  const values = [
    data.note_id,
    data.note_title,
    data.note_description,
    data.followup_date,
    data.updated_by
  ];

  const result = await pool.query(query, values);
  return result.rows[0].fn_update_case_note;
};

export const deleteCaseNote = async (note_id) => {
  const result = await pool.query(
    `SELECT fn_delete_case_note($1)`,
    [note_id]
  );

  return result.rows[0].fn_delete_case_note;
};

export const getClientsDropdown = async (user_id) => {
  const result = await pool.query(
    `SELECT fn_get_clients_dropdown($1)`,
    [user_id]
  );

  return result.rows[0].fn_get_clients_dropdown;
};

export const getCasesByClient = async (client_id) => {
  const result = await pool.query(
    `SELECT fn_get_cases_by_client($1)`,
    [client_id]
  );

  return result.rows[0].fn_get_cases_by_client;
};
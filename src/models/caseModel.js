import { pool } from "../config/db.js";

/* ================= ADD CASE ================= */
export const addCase = async (data) => {
  const result = await pool.query(
    `SELECT fn_case_insert($1) AS result`,
    [data]
  );

  return result.rows[0].result;
};


/* ================= CASE LIST ================= */
export const getCases = async (user_id, search, page, page_size) => {
  const result = await pool.query(
    `SELECT fn_get_all_cases($1,$2,$3,$4) AS result`,
    [user_id, search || null, page || 1, page_size || 10]
  );

  return result.rows[0].result;
};


/* ================= CASE DETAILS ================= */
export const getCaseDetails = async (case_id) => {
  const result = await pool.query(
    `SELECT fn_get_case_details($1) AS result`,
    [case_id]
  );

  return result.rows[0].result;
};


/* ================= UPDATE CASE ================= */
export const updateCase = async (case_id, data) => {
  const result = await pool.query(
    `SELECT fn_case_update($1,$2) AS result`,
    [case_id, data]
  );

  return result.rows[0].result;
};


/* ================= DELETE CASE ================= */
export const deleteCase = async (case_id, updated_by) => {
  const result = await pool.query(
    `SELECT fn_case_delete($1,$2) AS result`,
    [case_id, updated_by]
  );

  return result.rows[0].result;
};
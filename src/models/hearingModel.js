import { pool } from "../config/db.js";

export const insertHearing = async (data) => {
  const query = `SELECT fn_insert_hearing($1,$2,$3,$4,$5,$6,$7,$8)`;
  const values = [
    data.user_id,
    data.clientname,
    data.casetype,
    data.hearingdate,
    data.hearingtime,
    data.courtdetails,
    data.note,
    data.created_by
  ];

  const result = await pool.query(query, values);
  return result.rows[0].fn_insert_hearing;
};

export const getAllHearings = async (user_id) => {
  const result = await pool.query(
    `SELECT fn_get_all_hearings($1)`,
    [user_id]
  );
  return result.rows[0].fn_get_all_hearings;
};

export const getHearingById = async (hearing_id) => {
  const result = await pool.query(
    `SELECT fn_get_hearing_by_id($1)`,
    [hearing_id]
  );
  return result.rows[0].fn_get_hearing_by_id;
};

export const updateHearing = async (data) => {
  const query = `SELECT fn_update_hearing($1,$2,$3,$4,$5,$6,$7,$8)`;
  const values = [
    data.hearing_id,
    data.clientname,
    data.casetype,
    data.hearingdate,
    data.hearingtime,
    data.courtdetails,
    data.note,
    data.updated_by
  ];
  const result = await pool.query(query, values);
  return result.rows[0].fn_update_hearing;
};

export const deleteHearing = async (hearing_id) => {
  const result = await pool.query(
    `SELECT fn_delete_hearing($1)`,
    [hearing_id]
  );
  return result.rows[0].fn_delete_hearing;
};

export const getClientsForHearing = async (user_id) => {
  const result = await pool.query(
    `SELECT fn_get_clients_for_hearing($1)`,
    [user_id]
  );
  return result.rows[0].fn_get_clients_for_hearing;
};

export const getCaseTypes = async () => {
  const result = await pool.query(
    `SELECT fn_get_case_types()`
  );
  return result.rows[0].fn_get_case_types;
};
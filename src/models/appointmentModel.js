import { pool } from "../config/db.js";

export const insertAppointment = async (data) => {
  const query = `SELECT fn_insert_appointment($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
  const values = [
    data.user_id,
    data.advocate_name,
    data.client_name,
    data.case_type,
    data.appointment_date,
    data.appointment_time,
    data.duration,
    data.client_contact,
    data.note,
    data.created_by
  ];
  const result = await pool.query(query, values);
  return result.rows[0].fn_insert_appointment;
};

export const getAllAppointments = async (user_id) => {
  const result = await pool.query(
    `SELECT fn_get_all_appointments($1)`,
    [user_id]
  );
  return result.rows[0].fn_get_all_appointments;
};

export const getAppointmentById = async (appointment_id) => {
  const result = await pool.query(
    `SELECT fn_get_appointment_by_id($1)`,
    [appointment_id]
  );
  return result.rows[0].fn_get_appointment_by_id;
};

export const updateAppointment = async (data) => {
  const query = `SELECT fn_update_appointment($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
  const values = [
    data.appointment_id,
    data.advocate_name,
    data.client_name,
    data.case_type,
    data.appointment_date,
    data.appointment_time,
    data.duration,
    data.client_contact,
    data.note,
    data.updated_by
  ];
  const result = await pool.query(query, values);
  return result.rows[0].fn_update_appointment;
};

export const deleteAppointment = async (appointment_id) => {
  const result = await pool.query(
    `SELECT fn_delete_appointment($1)`,
    [appointment_id]
  );
  return result.rows[0].fn_delete_appointment;
};

export const getClientsForAppointment = async (user_id) => {
  const result = await pool.query(
    `SELECT fn_get_clients_for_appointment($1)`,
    [user_id]
  );
  return result.rows[0].fn_get_clients_for_appointment;
};

export const getCaseTypesDropdown = async () => {
  const result = await pool.query(
    `SELECT fn_get_case_types_dropdown()`
  );
  return result.rows[0].fn_get_case_types_dropdown;
};
import { pool } from "../config/db.js";

export const insertAppointment = async (data) => {

  const query = `
    SELECT fn_insert_appointment(
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
    )
  `;

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
import * as appointmentModel from "../models/appointmentModel.js";

export const createAppointmentService = async (data) => {
  return await appointmentModel.insertAppointment(data);
};

export const getAllAppointmentsService = async (user_id) => {
  return await appointmentModel.getAllAppointments(user_id);
};

export const getAppointmentByIdService = async (appointment_id) => {
  return await appointmentModel.getAppointmentById(appointment_id);
};

export const updateAppointmentService = async (data) => {
  return await appointmentModel.updateAppointment(data);
};

export const deleteAppointmentService = async (appointment_id) => {
  return await appointmentModel.deleteAppointment(appointment_id);
};

export const getClientsForAppointmentService = async (user_id) => {
  return await appointmentModel.getClientsForAppointment(user_id);
};

export const getCaseTypesDropdownService = async () => {
  return await appointmentModel.getCaseTypesDropdown();
};
import * as appointmentModel from "../models/calenderModel.js";

export const createAppointmentService = async (data) => {

  const result = await appointmentModel.insertAppointment(data);

  return result;
};
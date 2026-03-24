import * as appointmentService from "../services/appointmentService.js";

export const createAppointment = async (req, res) => {
  try {
      
    const result = await appointmentService.createAppointmentService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const result = await appointmentService.getAllAppointmentsService(req.params.user_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const result = await appointmentService.getAppointmentByIdService(req.params.appointment_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const result = await appointmentService.updateAppointmentService(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const result = await appointmentService.deleteAppointmentService(req.params.appointment_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientsForAppointment = async (req, res) => {
  try {
    const result = await appointmentService.getClientsForAppointmentService(req.params.user_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCaseTypesDropdown = async (req, res) => {
  try {
    const result = await appointmentService.getCaseTypesDropdownService();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
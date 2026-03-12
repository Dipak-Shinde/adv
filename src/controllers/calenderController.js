import * as appointmentService from "../services/calenderService.js";

export const createAppointment = async (req, res) => {
  try {
    const result = await appointmentService.createAppointmentService(req.body);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
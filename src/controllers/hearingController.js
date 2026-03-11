import * as hearingService from "../services/hearingService.js";

export const createHearing = async (req, res) => {
  try {
    const result = await hearingService.createHearingService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllHearings = async (req, res) => {
  try {
    const result = await hearingService.getAllHearingsService(req.params.user_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHearingById = async (req, res) => {
  try {
    const result = await hearingService.getHearingByIdService(req.params.hearing_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateHearing = async (req, res) => {
  try {
    const result = await hearingService.updateHearingService(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteHearing = async (req, res) => {
  try {
    const result = await hearingService.deleteHearingService(req.params.hearing_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientsForHearing = async (req, res) => {
  try {
    const result = await hearingService.getClientsForHearingService(req.params.user_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCaseTypes = async (req, res) => {
  try {
    const result = await hearingService.getCaseTypesService();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
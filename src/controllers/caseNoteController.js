import * as caseNoteService from "../services/caseNoteService.js";

export const createCaseNote = async (req, res) => {
  try {

      console.log(req.body);  

    const result = await caseNoteService.createCaseNoteService(req.body);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCaseNotes = async (req, res) => {
  try {

    const user_id = req.params.user_id;

    console.log(req.params);

    const result = await caseNoteService.getAllCaseNotesService(user_id);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCaseNoteById = async (req, res) => {
  try {
    const result = await caseNoteService.getCaseNoteByIdService(
      req.params.note_id
    );

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCaseNote = async (req, res) => {
  try {
    const result = await caseNoteService.updateCaseNoteService(req.body);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCaseNote = async (req, res) => {
  try {
    const result = await caseNoteService.deleteCaseNoteService(
      req.params.note_id
    );

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientsDropdown = async (req, res) => {
  try {
    console.log("USER ID:", req.params.user_id);
    const result = await caseNoteService.getClientsDropdownService(
      req.params.user_id
    );

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCasesByClient = async (req, res) => {
  try {
    const result = await caseNoteService.getCasesByClientService(
      req.params.client_id
    );

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
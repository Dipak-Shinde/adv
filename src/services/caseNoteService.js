import * as caseNoteModel from "../models/caseNoteModel.js";

export const createCaseNoteService = async (data) => {
  return await caseNoteModel.insertCaseNote(data);
};

export const getAllCaseNotesService = async (user_id) => {
  return await caseNoteModel.getAllCaseNotes(user_id);
};

export const getCaseNoteByIdService = async (note_id) => {
  return await caseNoteModel.getCaseNoteById(note_id);
};

export const updateCaseNoteService = async (data) => {
  return await caseNoteModel.updateCaseNote(data);
};

export const deleteCaseNoteService = async (note_id) => {
  return await caseNoteModel.deleteCaseNote(note_id);
};

export const getClientsDropdownService = async (user_id) => {
  return await caseNoteModel.getClientsDropdown(user_id);
};

export const getCasesByClientService = async (client_id) => {
  return await caseNoteModel.getCasesByClient(client_id);
};
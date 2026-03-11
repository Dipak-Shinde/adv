import * as hearingModel from "../models/hearingModel.js";

export const createHearingService = async (data) => {
  return await hearingModel.insertHearing(data);
};

export const getAllHearingsService = async (user_id) => {
  return await hearingModel.getAllHearings(user_id);
};

export const getHearingByIdService = async (hearing_id) => {
  return await hearingModel.getHearingById(hearing_id);
};

export const updateHearingService = async (data) => {
  return await hearingModel.updateHearing(data);
};

export const deleteHearingService = async (hearing_id) => {
  return await hearingModel.deleteHearing(hearing_id);
};

export const getClientsForHearingService = async (user_id) => {
  return await hearingModel.getClientsForHearing(user_id);
};

export const getCaseTypesService = async () => {
  return await hearingModel.getCaseTypes();
};
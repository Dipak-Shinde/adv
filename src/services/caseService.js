import * as caseModel from "../models/caseModel.js";

export const addCaseService = (data) => caseModel.addCase(data);

export const getCasesService = (user_id, search, page, page_size) =>
  caseModel.getCases(user_id, search, page, page_size);

export const getCaseDetailsService = (case_id) =>
  caseModel.getCaseDetails(case_id);

export const updateCaseService = (case_id, data) =>
  caseModel.updateCase(case_id, data);

export const deleteCaseService = (case_id, updated_by) =>
  caseModel.deleteCase(case_id, updated_by);
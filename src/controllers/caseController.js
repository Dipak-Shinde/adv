import * as caseService from "../services/caseService.js";


/* ================= ADD CASE ================= */

export const AddCase = async (req, res, next) => {
  try {

  
  
    const result = await caseService.addCaseService(req.body);

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};

/* ================= CASE LIST ================= */
export const CaseList = async (req, res, next) => {
  try {

    const { user_id, search, page, page_size } = req.query;

    const result = await caseService.getCasesService(
      user_id,
      search,
      page,
      page_size
    );

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};


/* ================= CASE DETAILS ================= */
export const ViewCaseDetails = async (req, res, next) => {
  try {
 console.log("CASE ID:", req.params.id);
    const result = await caseService.getCaseDetailsService(req.params.id);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};


/* ================= UPDATE CASE ================= */
export const EditCase = async (req, res, next) => {
  try {

    const result = await caseService.updateCaseService(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};


/* ================= DELETE CASE ================= */
export const DeleteCase = async (req, res, next) => {
  try {

    const { updated_by } = req.body;

    const result = await caseService.deleteCaseService(
      req.params.id,
      updated_by
    );

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};
import * as documentService from "../services/clientDocumentService.js";

export const createDocument = async (req, res) => {
  try {
    const data = await documentService.createDocumentService(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllDocuments = async (req, res) => {
  try {
    const data = await documentService.getAllDocumentsService(req.params.user_id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const data = await documentService.getDocumentByIdService(req.params.document_id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const data = await documentService.updateDocumentService(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const data = await documentService.deleteDocumentService(req.params.document_id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getClients = async (req, res) => {
  try {
    const data = await documentService.getClientsService(req.params.user_id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCases = async (req, res) => {
  try {
    const data = await documentService.getCasesService(req.params.client_id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
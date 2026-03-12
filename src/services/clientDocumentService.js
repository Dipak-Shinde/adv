import * as documentModel from "../models/clientDocumentModel.js";

export const createDocumentService = (data) =>
  documentModel.insertDocument(data);

export const getAllDocumentsService = (user_id) =>
  documentModel.getAllDocuments(user_id);

export const getDocumentByIdService = (document_id) =>
  documentModel.getDocumentById(document_id);

export const updateDocumentService = (data) =>
  documentModel.updateDocument(data);

export const deleteDocumentService = (document_id) =>
  documentModel.deleteDocument(document_id);

export const getClientsService = (user_id) =>
  documentModel.getClients(user_id);

export const getCasesService = (client_id) =>
  documentModel.getCases(client_id);
import * as clientModel from '../models/clientModel.js';

// export const createClientService = async (data) => {
//   return await clientModel.createClient(data);
// };

export const addClientService = async (data) => {
  return await clientModel.addClient(data);
};

export const getClientsService = (user_id) =>
  clientModel.getClients(user_id);

export const getClientFullDetailsService = async (client_id) => {
  return await clientModel.getClientFullDetails(client_id);
};

export const updateClientService = async (client_id, data) => {
  return await clientModel.updateClient(client_id, data);
};

export const deleteClientService = async (client_id, updated_by) => {
  return await clientModel.deleteClient(client_id, updated_by);
};

//------------------------Address

export const createAddressService = async (data) => {
  return await clientModel.createAddress(data);
};

export const getAddressesService = async () => {
  return await clientModel.getAddresses();
};

export const getAddressByIdService = async (id) => {
  return await clientModel.getAddressById(id);
};

export const getAddressByClientIdService = async (client_id) => {
  return await clientModel.getAddressByClientId(client_id);
};

export const updateAddressService = async (id, data) => {
  return await clientModel.updateAddress(id, data);
};

export const deleteAddressService = async (id) => {
  return await clientModel.deleteAddress(id);
};
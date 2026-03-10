import * as clientService from "../services/clientService.js";

/* ================= Add Client (Client + Address) ================= */
// export const AddClient = async (req, res, next) => {
//   try {

//     const result = await clientService.addClientService(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Client created successfully",
//       client_id: result.client_id
//     });

//   } catch (err) {
//     next(err);
//   }
// };

/* ================= Add Client (Client + Address) ================= */
export const AddClient = async (req, res, next) => {
  try {

    const {
      firstname,
      lastname,
      email,
      phoneno,
      dateofbirth,
      gender,
      user_id,

      addressline1,
      addressline2,
      city_id,
      state_id,
      country_id,
      pincode,
      created_by
    } = req.body;

    const result = await clientService.addClientService({
      firstname,
      lastname,
      email,
      phoneno,
      dateofbirth,
      gender,
      user_id,

      addressline1,
      addressline2,
      city_id,
      state_id,
      country_id,
      pincode,
      created_by
    });

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      client_id: result.client_id
    });

  } catch (err) {
    next(err);
  }
};

/* ================= Client List ================= */
export const ClientList = async (req, res, next) => {
  try {

    const { user_id } = req.params;

    const result = await clientService.getClientsService(user_id);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};


/* ================= View Client Details ================= */
export const ViewClientDetails = async (req, res, next) => {
  try {

    const client_id = req.params.id;

    const result = await clientService.getClientFullDetailsService(client_id);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};


/* ================= Edit Client ================= */
export const EditClient = async (req, res, next) => {
  try {

    const client_id = req.params.id;
    const data = req.body;

    const result = await clientService.updateClientService(client_id, data);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};


/* ================= Delete Client ================= */
export const DeleteClient = async (req, res, next) => {
  try {

    const client_id = req.params.id;
    const updated_by = req.body.updated_by || null;

    const result = await clientService.deleteClientService(
      client_id,
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
import {pool} from '../config/db.js';


export const addClient = async (data) => {
  const result = await pool.query(
    `SELECT insert_client_details($1) AS client_id`,
    [data]
  );

  return result.rows[0];
};

export const getClients = async (user_id) => {
  const result = await pool.query(
    `SELECT fn_get_all_clients($1) AS clients`,
    [user_id]
  );

  return result.rows[0].clients;
};

export const getClientFullDetails = async (client_id) => {
  const result = await pool.query(
    `SELECT get_client_full_details($1) AS client_details`,
    [client_id]
  );

  return result.rows[0].client_details;
};


export const updateClient = async (client_id, data) => {
  const result = await pool.query(
    `SELECT fn_update_client_by_id($1,$2) AS result`,
    [client_id, data]
  );

  return result.rows[0].result;
};

export const deleteClient = async (client_id, updated_by) => {
  const result = await pool.query(
    `SELECT fn_client_delete($1,$2) AS result`,
    [client_id, updated_by]
  );

  return result.rows[0].result;
};



//-------------------------------------------Address

export const createAddress = async (data) => {
  const result = await pool.query(
    `INSERT INTO address
    (client_id, user_id, addressline1, addressline2, city, state, country, pincode, created_by)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *`,
    [
      data.client_id,
      data.user_id,
      data.addressline1,
      data.addressline2,
      data.city,
      data.state,
      data.country,
      data.pincode,
      data.created_by
    ]
  );

  return result.rows[0];
};


// Get All Address
export const getAddresses = async () => {
  const result = await pool.query(
    `SELECT * FROM address ORDER BY address_id DESC`
  );

  return result.rows;
};


// Get Address By ID
export const getAddressById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM address WHERE address_id=$1`,
    [id]
  );

  return result.rows[0];
};


// Get Address By Client ID
export const getAddressByClientId = async (client_id) => {
  const result = await pool.query(
    `SELECT * FROM address WHERE client_id=$1`,
    [client_id]
  );

  return result.rows;
};


// Update Address
export const updateAddress = async (id, data) => {
  const result = await pool.query(
    `UPDATE address SET
      client_id=$1,
      user_id=$2,
      addressline1=$3,
      addressline2=$4,
      city=$5,
      state=$6,
      country=$7,
      pincode=$8,
      is_active=$9,
      updated_by=$10,
      updated_at=NOW()
     WHERE address_id=$11
     RETURNING *`,
    [
      data.client_id,
      data.user_id,
      data.addressline1,
      data.addressline2,
      data.city,
      data.state,
      data.country,
      data.pincode,
      data.is_active,
      data.updated_by,
      id
    ]
  );

  return result.rows[0];
};


// Delete Address
export const deleteAddress = async (id) => {
  await pool.query(
    `DELETE FROM address WHERE address_id=$1`,
    [id]
  );

  return { message: "Address deleted successfully" };
};
import {pool} from '../config/db.js';


export const addClient = async (data) => {
  const result = await pool.query(
  `SELECT insert_client_details($1::json) AS client_id`,  // cast to JSON
  [JSON.stringify(data)]                                  // stringify JS object
);

  return result.rows[0];
};



export const getClients = async (user_id) => {

  const result = await pool.query(
    `
    SELECT 
        c.client_id,
        c.firstname,
        c.lastname,
        c.email,
        c.phoneno,
        c.gender,

        a.addressline1,
        a.addressline2,
        a.pincode,

        ct.city_name AS city,
        s.state_name AS state,
        co.country_name AS country

    FROM clients c

    LEFT JOIN address a
    ON c.client_id = a.client_id

    LEFT JOIN cities ct
    ON a.city_id = ct.city_id

    LEFT JOIN states s
    ON a.state_id = s.state_id

    LEFT JOIN countries co
    ON a.country_id = co.country_id

    WHERE c.user_id = $1

    ORDER BY c.client_id DESC
    `,
    [user_id]
  );

  return result.rows;
};

export const getClientFullDetails = async (client_id) => {

  const result = await pool.query(
    `
    SELECT 
        c.client_id,
        c.firstname,
        c.lastname,
        c.email,
        c.phoneno,
        c.dateofbirth,
        c.gender,

        a.address_id,
        a.addressline1,
        a.addressline2,
        a.pincode,

        ct.city_id,
        ct.city_name,

        s.state_id,
        s.state_name,

        co.country_id,
        co.country_name

    FROM clients c

    LEFT JOIN address a
    ON c.client_id = a.client_id

    LEFT JOIN cities ct
    ON a.city_id = ct.city_id

    LEFT JOIN states s
    ON a.state_id = s.state_id

    LEFT JOIN countries co
    ON a.country_id = co.country_id

    WHERE c.client_id = $1
    `,
    [client_id]
  );

  return result.rows[0];
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

// export const createAddress = async (data) => {
//   const result = await pool.query(
//     `INSERT INTO address
//     (client_id, user_id, addressline1, addressline2, city_id, state_id, country_id, pincode, created_by)
//     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
//     RETURNING *`,
//     [
//       data.client_id,
//       data.user_id,
//       data.addressline1,
//       data.addressline2,
//       data.city_id,
//       data.state_id,
//       data.country_id,
//       data.pincode,
//       data.created_by
//     ]
//   );

//   return result.rows[0];
// };

export const createAddress = async (data) => {

  // get city name from cities table
  const cityResult = await pool.query(
    `SELECT city_name FROM cities WHERE city_id = $1`,
    [data.city_id]
  );

  const cityName = cityResult.rows[0]?.city_name || null;

  const result = await pool.query(
    `INSERT INTO address
    (client_id, user_id, addressline1, addressline2, pincode, city, city_id, state_id, country_id, created_by)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *`,
    [
      data.client_id,
      data.user_id,
      data.addressline1,
      data.addressline2,
      data.pincode,
      cityName,       // 👈 store city name
      data.city_id,
      data.state_id,
      data.country_id,
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
// export const getAddressByClientId = async (client_id) => {
//   const result = await pool.query(
//     `SELECT * FROM address WHERE client_id=$1`,
//     [client_id]
//   );

//   return result.rows;
// };
export const getAddressByClientId = async (client_id) => {
  const result = await pool.query(
    `SELECT 
        a.address_id,
        a.addressline1,
        a.addressline2,
        a.pincode,

        c.city_id,
        c.city_name,

        s.state_id,
        s.state_name,

        co.country_id,
        co.country_name

     FROM address a
     LEFT JOIN cities c ON a.city_id = c.city_id
     LEFT JOIN states s ON a.state_id = s.state_id
     LEFT JOIN countries co ON a.country_id = co.country_id

     WHERE a.client_id=$1`,
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
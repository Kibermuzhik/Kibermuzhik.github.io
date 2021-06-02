const db = require("../../config/db");

const getUserById = async (id) => {
  const connection = await db.getPromise();

  const queryString = `
    SELECT * FROM users WHERE id = ?;
    `;

  const result = await connection.query(queryString, [id]);
  return result[0][0];
};

const getUserByEmail = async (email) => {
  const connection = await db.getPromise();

  const queryString = `
    SELECT * FROM users WHERE email = ?;
    `;

  const result = await connection.query(queryString, [email]);
  return result[0][0];
};

const createUser = async ({ email, password, first_name, last_name }) => {
  const connection = await db.getPromise();
  const params = [email, password, first_name, last_name];

  const queryString = `
    INSERT INTO users (email, password, first_name, last_name)
    VALUES (?, ?, ?, ?);
    `;

  const result = await connection.query(queryString, params);
  return result[0];
};

module.exports = { createUser, getUserById, getUserByEmail };

const UserModel = require("./user.model");

const getUserById = async (id) => {
  return await UserModel.getUserById(id);
};

const getUserByEmail = async (email) => {
  return await UserModel.getUserByEmail(email);
};

const createUser = async ({ email, password, first_name, last_name }) => {
  const existUser = await getUserByEmail(email);
  if (existUser) throw new Error(`Email "${email}" is taken.`);

  const result = await UserModel.createUser({ email, password, first_name, last_name });
  return await getUserById(result.insertId);
};

const getUserPasswordByEmail = async (email) => {
  const user = await UserModel.getUserByEmail(email);
  if (!user) return;
  return user.password;
};

module.exports = { createUser, getUserById, getUserByEmail, getUserPasswordByEmail };

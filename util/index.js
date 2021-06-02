const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};

const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password was not provided");
  }

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = { generateAccessToken, hashPassword };

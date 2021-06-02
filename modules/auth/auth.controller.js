const UserService = require("../user/user.service");
const { hashPassword } = require("../../util");
const AuthService = require("./auth.service");

const signUp = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body.data;
    if (!email || !password || !first_name || !last_name) throw new Error("Invalid data");

    const result = await UserService.createUser({
      email,
      password: await hashPassword(password),
      first_name,
      last_name,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body.data;
  try {
    if (!email || !password) throw new Error("Invalid data");

    const userPassword = await UserService.getUserPasswordByEmail(email);
    if (!userPassword) throw new Error("No account found with this username");

    if (!(await AuthService.verifyPassword(password, userPassword))) throw new Error("Invalid password");

    const userData = await AuthService.signIn(email);

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { signUp, signIn };

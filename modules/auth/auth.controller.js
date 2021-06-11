const UserService = require("../user/user.service");
const { hashPassword } = require("../../util");
const AuthService = require("./auth.service");

const signUp = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    if (!email || !password || !first_name || !last_name) throw new Error("Invalid data");

    const result = await UserService.createUser({
      email,
      password: await hashPassword(password),
      first_name,
      last_name,
    });
    res
      .status(200)
      .cookie("userData", result, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
      .redirect("/auth/signin");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("Invalid data");

    const userPassword = await UserService.getUserPasswordByEmail(email);
    if (!userPassword) throw new Error("No account found with this username");

    if (!(await AuthService.verifyPassword(password, userPassword))) throw new Error("Invalid password");

    const userData = await AuthService.signIn(email);
    res
      .status(200)
      .cookie("userData", userData, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
      .redirect("/profile");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const signOut = async (req, res) => {
  res.clearCookie("userData").redirect("/");
};

const getIn = async (req, res) => {
  res.render("signform", { title: "Sign In", signin: true, signup: false });
};

const getUp = async (req, res) => {
  res.render("signform", { title: "Sign Up", signin: false, signup: true });
};

module.exports = { signUp, signIn, signOut, getIn, getUp };

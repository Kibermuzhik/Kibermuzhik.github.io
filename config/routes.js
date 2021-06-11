const auth = require("../modules/auth/auth.route");
const root = require("../modules/root/root.route");
const profile = require("../modules/user/user.routes");

const initRouter = (app) => {
  app.use("/", root);
  app.use("/auth", auth);
  app.use("/profile", profile);
};

module.exports = { initRouter };

const auth = require("../modules/auth/auth.route");

const initRouter = (app) => {
  app.use("/auth", auth);
};

module.exports = { initRouter };

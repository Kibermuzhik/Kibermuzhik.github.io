const router = require("express").Router();
const auth = require("../../middleware/auth");
const UserController = require("./user.controller");

router.get("/", auth.AuthMiddleware, UserController.getProfile);

module.exports = router;

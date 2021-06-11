const router = require("express").Router();
const AuthController = require("./auth.controller");

router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.get("/signin", AuthController.getIn);
router.get("/signup", AuthController.getUp);
router.get("/signout", AuthController.signOut);

module.exports = router;

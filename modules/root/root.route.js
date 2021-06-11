const router = require("express").Router();
const rootController = require("./root.controller");

router.get("/", rootController.getIndex);

module.exports = router;

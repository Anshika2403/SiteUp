const express = require("express");
const router = express.Router();

const notifyController = require("../controllers/notify.js");

router.get("/:id", notifyController.getNotify);

module.exports = router;
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

// router.patch("/update", authenticate, userController.updateUser);

router.post("/logout", userController.logoutUser);

module.exports = router;

const { Category, Product, User } = require("../models");
const express = require("express");
const ControllerUser = require("../controllers/controllerUser");




const router = express.Router();

router.get("/", ControllerUser.readAllUsers);
router.post("/", ControllerUser.createNewUser);
router.post("/google-sign-in", ControllerUser.googleLogin)
router.post("/login", ControllerUser.loginUser);

module.exports = router;

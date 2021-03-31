const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post("/", authControllers.autenticarUser);

router.get("/", auth, authControllers.getUser);

module.exports = router;

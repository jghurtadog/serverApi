const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("userName", "userName is mandatory").not().isEmpty(),
    check("email", "email is invalido").isEmail(),
    check("password", "password minimu 6 character").isLength({ min: 6 }),
  ],
  userControllers.createUser
);

module.exports = router;

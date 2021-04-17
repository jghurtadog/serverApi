const express = require("express");
const router = express.Router();
const classificationController = require("../controllers/classificationControllers");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("type", "El type es obligatorio").not().isEmpty(),
    check("description", "La descripcion es obligatorio").not().isEmpty(),
  ],
  auth,
  classificationController.createClassification
);

router.get("/:type", auth, classificationController.getClassificationsByType);

module.exports = router;

const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteControllers");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("title", "El title de la nota es obligatorio").not().isEmpty(),
    check("description", "La descripcion de la nota es obligatorio").not().isEmpty(),
  ],
  auth,
  noteController.createNote
);

router.get("/", auth, noteController.getNotes);

router.put(
  "/:id",
  auth,
  [
    check("description", "La descripcion de la nota es obligatorio").not().isEmpty(),
  ],
  noteController.updateNote
);

router.delete("/:id", auth, noteController.deleteNote);

module.exports = router;

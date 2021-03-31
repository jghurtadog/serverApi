const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectControllers");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nameProject", "El nombre del projecto es obligatorio")
      .not()
      .isEmpty(),
  ],
  auth,
  projectController.createProject
);

router.get("/", auth, projectController.getProjects);

router.put(
  "/:id",
  auth,
  [
    check("nameProject", "El nombre del projecto es obligatorio")
      .not()
      .isEmpty(),
  ],
  projectController.updateProject
);

router.delete("/:id", auth, projectController.deleteProject);

module.exports = router;

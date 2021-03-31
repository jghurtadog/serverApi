const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/taskControllers");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/",
  [check("nameTask", "El nombre de la tarea es obligatorio").not().isEmpty()],
  [check("projectId", "El Projecto es obligatorio").not().isEmpty()],
  auth,
  taskControllers.createTask
);

router.get("/", auth, taskControllers.getTask);

router.put(
  "/:id",
  [check("nameTask", "El nombre de la tarea es obligatorio").not().isEmpty()],
  [check("projectId", "El Projecto es obligatorio").not().isEmpty()],
  auth,
  taskControllers.updateTask
);

router.delete("/:id", auth, taskControllers.deleteTask);

module.exports = router;

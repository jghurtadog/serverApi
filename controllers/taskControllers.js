const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { projectId } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Projecto no encontrado" });
    }
    if (project.creater.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.getTask = async (req, res) => {
  const { projectId } = req.query;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Projecto no encontrado" });
    }
    if (project.creater.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    const task = await Task.find({ projectId });
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { projectId, status, nameTask } = req.body;
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrado" });
    }

    const updateTask = {};
    updateTask.nameTask = nameTask;
    updateTask.status = status;

    task = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updateTask },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrado" });
    }

    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

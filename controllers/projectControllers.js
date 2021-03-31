const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const project = new Project(req.body);
    project.creater = req.user.id;
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ creater: req.user.id });
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.updateProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { nameProject } = req.body;
  const updateProject = {};

  if (nameProject) {
    updateProject.nameProject = nameProject;
  }

  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Projecto no encontrado" });
    }
    if (project.creater.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updateProject },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.deleteProject = async (req, res) => {

  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Projecto no encontrado" });
    }
    if (project.creater.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Projecto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

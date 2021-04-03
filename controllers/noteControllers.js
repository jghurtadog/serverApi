const Note = require("../models/Note");
const { validationResult } = require("express-validator");

exports.createNote = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const note = new Note(req.body);
    note.creater = req.user.id;
    note.save();
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ creater: req.user.id });
    res.json({ notes });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.updateNote = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { description } = req.body;
  const updateNote = {};

  if (description) {
    updateNote.description = description;
  }

  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note no encontrada" });
    }
    if (note.creater.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    note = await Note.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updateNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: "Note no encontrada" });
    }
    if (note.creater.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    await Note.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Note eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

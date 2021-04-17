const Classification = require("../models/Classification");
const { validationResult } = require("express-validator");

exports.createClassification = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const classification = new Classification(req.body);
    classification.save();
    res.json(classification);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.getClassificationsByType = async (req, res) => {
  console.log("req.params.type", req.params.type);
  try {
    const classifications = await Classification.find({ type: req.params.type });
    res.json({ classifications });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

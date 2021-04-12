const Transaction = require("../models/Transaction");
const { validationResult } = require("express-validator");

exports.createTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const transaction = new Transaction(req.body);
    transaction.creater = req.user.id;
    transaction.save();
    res.json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ creater: req.user.id });
    res.json({ transactions });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

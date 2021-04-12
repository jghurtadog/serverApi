const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  paymentMethod: {
    type: String,
    require: true,
    trim: true,
  },
  value: {
    type: Number,
    require: true,
  },
  concept: {
    type: String,
    require: true,
    trim: true,
  },
  client: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    require: true,
    trim: true,
  },
  classification: {
    type: String,
    trim: true,
  },
  creater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateRegistre: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);

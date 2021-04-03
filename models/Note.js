const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
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

module.exports = mongoose.model("Note", NoteSchema);

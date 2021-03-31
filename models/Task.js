const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  nameTask: {
    type: String,
    require: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  dateRegistre: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Task", TaskSchema);

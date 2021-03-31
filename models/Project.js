const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  nameProject: {
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

module.exports = mongoose.model("Project", ProjectSchema);

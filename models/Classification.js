const mongoose = require("mongoose");

const ClassificationSchema = mongoose.Schema({
  type: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
});

module.exports = mongoose.model("Classification", ClassificationSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QualitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quality", QualitySchema);

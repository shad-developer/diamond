const mongoose = require("mongoose");

const JewelleryRuleSchema = new mongoose.Schema(
  {
    pureHoursQuotation: {
      type: String,
      required: true,
    },
    drop: {
      type: String,
      required: true,
    },
    fixedExpenses: {
      type: String,
      required: true,
    },
    sideSettingSingleStone: {
      type: String,
      required: true,
    },
    centralSettingSingleStone: {
      type: String,
      required: true,
    },
    publicPrice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JewelleryRule", JewelleryRuleSchema);

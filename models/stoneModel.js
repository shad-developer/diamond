const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LargeStoneSchema = new Schema(
  {
    certificateNo: {
      type: String,
    },
    cuts: {
      type: String,
    },
    carats: {
      type: String,
    },
    degrees: {
      type: String,
    },
    color: {
      type: String,
    },
    proportions: {
      type: String,
    },
    finish: {
      type: String,
    },
    brilliance: {
      type: String,
    },
    fluorescence: {
      type: String,
    },
    price_per_carat: {
      type: String,
    },
    finished_stone_price: {
      type: String,
    },
    public_price: {
      type: String,
    },
    note: {
      type: String,
    },
    average: {
      type: String,
    },
    costs: {
      type: String,
    },
    finished_cost: {
      type: String,
    },
    total_compl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("largeStone", LargeStoneSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    nominative: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobilePhone: {
      type: String,
    },
    telephone: {
      type: String,
    },
    fax: {
      type: String,
    },
    piva: {
      type: String,
    },
    fiscalCode: {
      type: String,
    },
    cap: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    iban: {
      type: String, 
    },
    paymentMode: {
      type: String,
    },
    customerCredit: {
      type: Number,
      default: 0,
    },
    customerStatus: {
      type: String,
      required: true,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);

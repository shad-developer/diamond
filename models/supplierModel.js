const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema(
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
    vatNo: {
      type: String,
    },
    taxCode: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", SupplierSchema);

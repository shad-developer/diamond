const Supplier = require("../models/supplierModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Create new supplier
module.exports.addNewSupplier = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const isUser = await User.findById(user._id);

    if (!isUser) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const {
      nominative,
      email,
      mobilePhone,
      telephone,
      fax,
      vatNo,
      taxCode,
      address,
      city,
      province,
      cap,
      iban,
      paymentMode,
    } = req.body;

    const newSupplier = new Supplier({
      nominative,
      email,
      mobilePhone,
      telephone,
      fax,
      vatNo,
      taxCode,
      address,
      city,
      province,
      cap,
      iban,
      paymentMode,
    });

    const savedSupplier = await newSupplier.save();
    res.status(201).json({ error: false, message:"Supplier Added Successful", supplier: savedSupplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


// Get all Suppliers
module.exports.getAllSuppliers = asyncHandler(async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json({ error: false, suppliers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to fetch suppliers" });
  }
});

// Get supplier by ID
module.exports.getSupplierById = asyncHandler(async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: true, message: "Supplier not found" });
    }
    res.json({ error: false, supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to fetch supplier" });
  }
});

// Update a client
module.exports.updateSupplier = asyncHandler(async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSupplier) {
      return res.status(404).json({ error: true, message: "Supplier not found" });
    }
    res.json({ error: false, message:"Supplier Updated", supplier: updatedSupplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to update supplier" });
  }
});

// Delete a client
module.exports.deleteSupplier = asyncHandler(async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) {
      return res.status(404).json({ error: true, message: "Supplier not found" });
    }
    res.json({ error: false, message: "Supplier deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to delete Supplier" });
  }
});

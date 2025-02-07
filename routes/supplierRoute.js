const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const { protected, isAdmin } = require("../middleware/authMiddleware");

router.post("/add-supplier", protected, isAdmin, supplierController.addNewSupplier);

router.get("/suppliers", protected, supplierController.getAllSuppliers);

router.get("/supplier/:id", protected, supplierController.getSupplierById);

router.put("/supplier/:id", protected, isAdmin, supplierController.updateSupplier);

router.delete("/supplier/:id", protected, isAdmin, supplierController.deleteSupplier);

module.exports = router;

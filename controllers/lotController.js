const LotModel = require("../models/lottsModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Create new Lot
module.exports.addNewLot = asyncHandler(async (req, res) => {
    try {
        const { user } = req;
        const isUser = await User.findById(user._id);

        if (!isUser) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        const {
            dateOfInsert,
            supplier,
            totalCost,
            totalCarats,
            caratsPaid,
        } = req.body;

        const lastLot = await LotModel.findOne().sort({ _id: -1 });
        const currentYear = new Date().getFullYear();
        let newLotNumber = "0001"; 
        if (lastLot) {
            const lastNumber = parseInt(lastLot.lotName.split("-")[2], 10); 
            newLotNumber = String(lastNumber + 1).padStart(4, "0"); 
        }

        const newLotName = `LT-${currentYear}-${newLotNumber}`;

        const newLot = new LotModel({
            lotName: newLotName,
            dateOfInsert,
            supplier,
            totalCost,
            totalCarats,
            caratsPaid,
        });

        const savedLot = await newLot.save();
        res.status(201).json({
            error: false,
            message: "Lot Added Successful",
            lot: savedLot,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});


// Get all lots
module.exports.gettAllLots = asyncHandler(async (req, res) => {
    try {
        const lots = await LotModel.find();
        res.json({ error: false, lots });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: "Failed to fetch lots" });
    }
});

// Get lot by ID
module.exports.getLotById = asyncHandler(async (req, res) => {
    try {
        const lot = await LotModel.findById(req.params.id);
        if (!lot) {
            return res.status(404).json({ error: true, message: "Lot not found" });
        }
        res.json({ error: false, lot });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: "Failed to fetch lot" });
    }
});

// Update a lot
module.exports.updateLot = asyncHandler(async (req, res) => {
    try {
        const updatedLot = await LotModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedLot) {
            return res.status(404).json({ error: true, message: "Lot not found" });
        }
        res.json({
            error: false,
            message: "Lot Updated",
            lot: updatedLot,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: "Failed to update Lot" });
    }
});

// Delete a lot
module.exports.deleteLott = asyncHandler(async (req, res) => {
    try {
        const deletedLott = await LotModel.findByIdAndDelete(req.params.id);
        if (!deletedLott) {
            return res.status(404).json({ error: true, message: "Lot not found" });
        }
        res.json({ error: false, message: "Lot deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: "Failed to delete Lot" });
    }
});

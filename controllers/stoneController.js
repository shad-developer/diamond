const { default: stoneService } = require("../client/src/app/services/stoneService");
const Stone = require("../models/stoneModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Create new Stone
module.exports.addNewStone = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const isUser = await User.findById(user._id);

    if (!isUser) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const {
      certificateNo,
      cuts,
      carats,
      degrees,
      color,
      proportions,
      finish,
      brilliance,
      fluorescence,
      price_per_carat,
      finished_stone_price,
      public_price,
      note,
      average,
      costs,
      finished_cost,
      total_compl,
    } = req.body;

    const newStone = new Stone({
      certificateNo,
      cuts,
      carats,
      degrees,
      color,
      proportions,
      finish,
      brilliance,
      fluorescence,
      price_per_carat,
      finished_stone_price,
      public_price,
      note,
      average,
      costs,
      finished_cost,
      total_compl,
    });

    const savedStone = await newStone.save();
    res.status(201).json({
      error: false,
      message: "Stone Added Successful",
      stone: savedStone,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Get all stones
module.exports.getAllStones = asyncHandler(async (req, res) => {
  try {
    const stones = await Stone.find();
    res.json({ error: false, stones });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to fetch stones" });
  }
});

// Get stone by ID
module.exports.getStoneById = asyncHandler(async (req, res) => {
  try {
    const stone = await Stone.findById(req.params.id);
    if (!stone) {
      return res.status(404).json({ error: true, message: "Stone not found" });
    }
    res.json({ error: false, stone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to fetch stone" });
  }
});

// Update a stone
module.exports.updateStone = asyncHandler(async (req, res) => {
  try {
    const updatedStone = await Stone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStone) {
      return res.status(404).json({ error: true, message: "Stone not found" });
    }
    res.json({
      error: false,
      message: "Stone Updated",
      stone: updatedStone,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to update stone" });
  }
});

// Delete a sone
module.exports.deleteStone = asyncHandler(async (req, res) => {
  try {
    const deletedStone = await Stone.findByIdAndDelete(req.params.id);
    if (!deletedStone) {
      return res.status(404).json({ error: true, message: "Stone not found" });
    }
    res.json({ error: false, message: "Stone deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to delete stone" });
  }
});

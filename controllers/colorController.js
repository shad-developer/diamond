const colorModel = require("../models/colorModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Create new color type
module.exports.createColor = asyncHandler(async (req, res) => {
 
    const { user } = req;
    const isUser = await User.findById(user._id);

    if (!isUser) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: true, message: "Name is required" });
        }

    const savedColor = await new colorModel({ name }).save();
    res.status(201).json({ error: false, message: "Color Added Successfully", color: savedColor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});




// Get all colors
module.exports.getAllColors = asyncHandler(async (req, res) => {
  try {
    const colors = await colorModel.find();
    res.json({ error: false, colors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to fetch colors" });
  }
});

// Get color by ID
module.exports.getColorById = asyncHandler(async (req, res) => {
  try {
    const color = await colorModel.findById(req.params.id);
    if (!color) {
      return res
        .status(404)
        .json({ error: true, message: "color not found" });
    }
    res.json({ error: false, color });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to fetch color" });
  }
});

// Update a color
module.exports.updateColor = asyncHandler(async (req, res) => {
  try {
    const updatedColor = await colorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedColor) {
      return res
        .status(404)
        .json({ error: true, message: "Color not found" });
    }
    res.json({
      error: false,
      message: "Color Updated",
      color: updatedColor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to update color" });
  }
});

// Delete a color
module.exports.deleteColor = asyncHandler(async (req, res) => {
  try {
    const deletedColor = await colorModel.findByIdAndDelete(req.params.id);
    if (!deletedColor) {
      return res
        .status(404)
        .json({ error: true, message: "Color not found" });
    }
    res.json({ error: false, message: "Color deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to delete Color" });
  }
});

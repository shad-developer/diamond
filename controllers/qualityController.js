const qualityModel = require("../models/qualityModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Create new quality type
module.exports.createQuality = asyncHandler(async (req, res) => {
 
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

    const savedQuality = await new qualityModel({ name }).save();
    res.status(201).json({ error: false, message: "Quality Added Successfully", quality: savedQuality });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});




// Get all qualities
module.exports.getAllQualities = asyncHandler(async (req, res) => {
  try {
    const qualities = await qualityModel.find();
    res.json({ error: false, qualities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to fetch qualities" });
  }
});

// Get quality by ID
module.exports.getQualityById = asyncHandler(async (req, res) => {
  try {
    const quality = await qualityModel.findById(req.params.id);
    if (!quality) {
      return res
        .status(404)
        .json({ error: true, message: "quality not found" });
    }
    res.json({ error: false, quality });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to fetch supplier" });
  }
});

// Update a quality
module.exports.updateQuality = asyncHandler(async (req, res) => {
  try {
    const updatedQuality = await qualityModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedQuality) {
      return res
        .status(404)
        .json({ error: true, message: "Quality not found" });
    }
    res.json({
      error: false,
      message: "Quality Updated",
      quality: updatedQuality,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to update quality" });
  }
});

// Delete a quality
module.exports.deleteQuality = asyncHandler(async (req, res) => {
  try {
    const deletedQuality = await qualityModel.findByIdAndDelete(req.params.id);
    if (!deletedQuality) {
      return res
        .status(404)
        .json({ error: true, message: "Quality not found" });
    }
    res.json({ error: false, message: "Quality deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to delete Quality" });
  }
});

const JewelleryType = require("../models/JewelleryTypeModal");

// Function to create  jewellery type
module.exports.saveJewelleryType = async (req, res) => {
  try {
    const { type, description } = req.body;
    if (!type || !description) {
      return res
        .status(400)
        .json({ error: true, message: "Missing required fields" });
    }

    const newType = new JewelleryType({
      type,
      description,
    });

    await newType.save();
    return res
      .status(201)
      .json({ message: "Created successfully", data: newType });
  } catch (error) {
    console.error("Error saving jewellery Type:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to fetch the existing types
module.exports.getJewelleryType = async (req, res) => {
  try {
    const jewelleryTypes = await JewelleryType.find({});
    if (jewelleryTypes) {
      res.status(200).json(jewelleryTypes);
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching jewellery Type:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// get type by id
module.exports.getJewelleryTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const jewelleryType = await JewelleryType.findById(id);
    if (!jewelleryType) {
      return res
        .status(404)
        .json({ error: true, message: "Jewellery type not found" });
    }
    res.json(jewelleryType);
  } catch (error) {
    console.error("Error fetching jewellery type by id:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// update type by id

module.exports.updateJewelleryType = async (req, res) => {
  const { id } = req.params;
  const { type, description } = req.body;
  try {
    const updatedType = await JewelleryType.findByIdAndUpdate(
      id,
      { type, description },
      { new: true }
    );
    if (!updatedType) {
      return res
        .status(404)
        .json({ error: true, message: "Jewellery type not found" });
    }
    res.json({ message: "Updated Successfull", updatedType });
  } catch (error) {
    console.error("Error updating jewellery type by id:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// delete type by id

module.exports.deleteJewelleryType = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedType = await JewelleryType.findByIdAndDelete(id);
    if (!deletedType) {
      return res
        .status(404)
        .json({ error: true, message: "Jewellery type not found" });
    }
    res.json({ message: "Deleted successfully", deletedType });
  } catch (error) {
    console.error("Error deleting jewellery type by id:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
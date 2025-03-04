const JewelleryRule = require("../models/JewelleryRuleModel");

// Function to create or update jewellery rules
module.exports.saveJewelleryRules = async (req, res) => {
  try {
    const {
      pureHoursQuotation,
      drop,
      fixedExpenses,
      sideSettingSingleStone,
      centralSettingSingleStone,
      publicPrice,
      } = req.body;
      

    // Find if any record exists
    let existingRule = await JewelleryRule.findOne();

    if (existingRule) {
      // Update the existing record
      existingRule.pureHoursQuotation = pureHoursQuotation;
      existingRule.drop = drop;
      existingRule.fixedExpenses = fixedExpenses;
      existingRule.sideSettingSingleStone = sideSettingSingleStone;
      existingRule.centralSettingSingleStone = centralSettingSingleStone;
      existingRule.publicPrice = publicPrice;

      await existingRule.save();
      return res
        .status(200)
        .json({ message: "Updated successfully", data: existingRule });
    } else {
      // Create a new record if no existing one is found
      const newRule = new JewelleryRule({
        pureHoursQuotation,
        drop,
        fixedExpenses,
        sideSettingSingleStone,
        centralSettingSingleStone,
        publicPrice,
      });

      await newRule.save();
      return res
        .status(201)
        .json({ message: "Created successfully", data: newRule });
    }
  } catch (error) {
    console.error("Error saving jewellery rules:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to fetch the existing rules
module.exports.getJewelleryRules = async (req, res) => {
  try {
    const existingRule = await JewelleryRule.findOne();
    if (existingRule) {
      res.status(200).json(existingRule);
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching jewellery rules:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const express = require("express");
const router = express.Router();
const colorController = require("../controllers/colorController");
const { protected, isAdmin } = require("../middleware/authMiddleware");

router.post("/add-color", protected, isAdmin, colorController.createColor);

router.get("/colors", protected, colorController.getAllColors);

router.get("/color/:id", protected, colorController.getColorById);

router.put("/color/:id", protected, isAdmin, colorController.updateColor);

router.delete("/color/:id", protected, isAdmin, colorController.deleteColor);

module.exports = router;

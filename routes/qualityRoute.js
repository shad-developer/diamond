const express = require("express");
const router = express.Router();
const qualityController = require("../controllers/qualityController");
const { protected, isAdmin } = require("../middleware/authMiddleware");

router.post("/add-quality", protected, isAdmin, qualityController.createQuality);

router.get("/qualities", protected, qualityController.getAllQualities);

router.get("/quality/:id", protected, qualityController.getQualityById);

router.put("/quality/:id", protected, isAdmin, qualityController.updateQuality);

router.delete("/quality/:id", protected, isAdmin, qualityController.deleteQuality);

module.exports = router;

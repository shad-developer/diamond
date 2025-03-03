const express = require("express");
const router = express.Router();
const stoneController = require("../controllers/stoneController");
const { protected, isAdmin } = require("../middleware/authMiddleware");

router.post("/add-stone", protected, isAdmin, stoneController.addNewStone);

router.get("/stones", protected, stoneController.getAllStones);

router.get("/stone/:id", protected, stoneController.getStoneById);

router.put("/stone/:id", protected, isAdmin, stoneController.updateStone);

router.delete("/stone/:id", protected, isAdmin, stoneController.deleteStone);

module.exports = router;

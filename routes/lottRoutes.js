const express = require("express");
const router = express.Router();
const lottController = require("../controllers/lotController");
const { protected, isAdmin } = require("../middleware/authMiddleware");

router.post("/add-lot", protected, isAdmin, lottController.addNewLot);

router.get("/lotts", protected, lottController.gettAllLots);

router.get("/lot/:id", protected, lottController.getLotById);

router.put("/lot/:id", protected, isAdmin, lottController.updateLot);

router.delete("/lot/:id", protected, isAdmin, lottController.deleteLott);

module.exports = router;

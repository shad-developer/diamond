const express = require("express");
const router = express.Router();
const jewelleryRulesController = require("../controllers/jewelleryRulesController");
const jewelleryTypeController = require('../controllers/jewelleryTypeController');

router.get("/jewellery-rules", jewelleryRulesController.getJewelleryRules);
router.post("/jewellery-rule", jewelleryRulesController.saveJewelleryRules);


//  jewellery types
router.get("/jewellery-types", jewelleryTypeController.getJewelleryType);
router.get("/jewellery-type/:id", jewelleryTypeController.getJewelleryTypeById);
router.post("/jewellery-type", jewelleryTypeController.saveJewelleryType);
router.put("/jewellery-type/:id", jewelleryTypeController.updateJewelleryType);
router.delete("/jewellery-type/:id", jewelleryTypeController.deleteJewelleryType);


module.exports = router;

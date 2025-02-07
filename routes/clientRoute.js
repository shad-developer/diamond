const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const { protected, isAdmin } = require("../middleware/authMiddleware");

router.post("/add-client", protected, isAdmin, clientController.addNewClient);

router.get("/clients", protected, clientController.getAllClients);

router.get("/client/:id", protected, clientController.getClientById);

router.put("/client/:id", protected, isAdmin, clientController.updateClient);

router.delete("/client/:id", protected, isAdmin, clientController.deleteClient);

module.exports = router;

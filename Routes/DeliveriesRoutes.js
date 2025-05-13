const express = require("express");
const router = express.Router();
const {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  updateDelivery,
  deleteDelivery
} = require("../Controllers/DeliveriesController");
const authentication = require("../Middleware/authenticationUsers");

router.post("/", authentication, createDelivery);
router.get("/", authentication, getAllDeliveries);
router.get("/:id", authentication, getDeliveryById);
router.put("/:id", authentication, updateDelivery);
router.delete("/:id", authentication, deleteDelivery);

module.exports = router;
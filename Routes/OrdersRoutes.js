const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} = require("../Controllers/OrdersController");
const authentication = require("../Middleware/authenticationUsers");

router.post("/", authentication, createOrder);
router.get("/", authentication, getAllOrders);
router.get("/:id", authentication, getOrderById);
router.put("/:id", authentication, updateOrder);
router.delete("/:id", authentication, deleteOrder);

module.exports = router;
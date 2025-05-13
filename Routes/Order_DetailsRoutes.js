const express = require("express");
const router = express.Router();
const {
  createOrderDetail,
  getAllOrderDetails,
  getOrderDetailsByOrderId,
  updateOrderDetail,
  deleteOrderDetail
} = require("../Controllers/Order_DetailsController");
const authentication = require("../Middleware/authenticationUsers");

router.post("/", authentication, createOrderDetail);
router.get("/", authentication, getAllOrderDetails);
router.get("/order/:orderId", authentication, getOrderDetailsByOrderId);
router.put("/:id", authentication, updateOrderDetail);
router.delete("/:id", authentication, deleteOrderDetail);

module.exports = router;
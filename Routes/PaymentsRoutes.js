const express = require("express");
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentByOrderId,
  updatePayment,
  deletePayment
} = require("../Controllers/PaymentsController");
const authentication = require("../Middleware/authenticationUsers");

router.post("/", authentication, createPayment);
router.get("/", authentication, getAllPayments);
router.get("/:id", authentication, getPaymentById);
router.get("/order/:orderId", authentication, getPaymentByOrderId);
router.put("/:id", authentication, updatePayment);
router.delete("/:id", authentication, deletePayment);

module.exports = router;
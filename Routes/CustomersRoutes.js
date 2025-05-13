const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} = require("../Controllers/CustomersController");
const authentication = require("../Middleware/authenticationUsers");

router.post("/", authentication, createCustomer);
router.get("/", authentication, getAllCustomers);
router.get("/:id", authentication, getCustomerById);
router.put("/:id", authentication, updateCustomer);
router.delete("/:id", authentication, deleteCustomer);

module.exports = router;
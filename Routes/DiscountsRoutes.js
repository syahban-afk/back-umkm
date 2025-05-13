const express = require("express");
const router = express.Router();
const {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount
} = require("../Controllers/DiscountsController");
const authentication = require("../Middleware/authenticationUsers");

router.post("/", authentication, createDiscount);
router.get("/", authentication, getAllDiscounts);
router.get("/:id", authentication, getDiscountById);
router.put("/:id", authentication, updateDiscount);
router.delete("/:id", authentication, deleteDiscount);

module.exports = router;
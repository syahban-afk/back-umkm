const express = require("express");
const router = express.Router();
const {
    createDiscountCategory,
    getAllDiscountCategories,
    getDiscountCategoryById,
    updateDiscountCategory,
    deleteDiscountCategory
} = require("../Controllers/Discount_CategoriesController");
const authentication = require("../Middleware/authenticationUsers");

router.post("/", authentication, createDiscountCategory);
router.get("/", authentication, getAllDiscountCategories);
router.get("/:id", authentication, getDiscountCategoryById);
router.put("/:id", authentication, updateDiscountCategory);
router.delete("/:id", authentication, deleteDiscountCategory);

module.exports = router;
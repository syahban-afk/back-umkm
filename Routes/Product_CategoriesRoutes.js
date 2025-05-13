const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../Controllers/Product_CategoriesController");
const authentication = require("../Middleware/authenticationUsers");

router.post("/", authentication, createCategory);
router.get("/", authentication, getAllCategories);
router.get("/:id", authentication, getCategoryById);
router.put("/:id", authentication, updateCategory);
router.delete("/:id", authentication, deleteCategory);

module.exports = router;
const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductPhoto
} = require("../Controllers/ProductsController");
const upload = require("../Middleware/uploadPhoto");
const authentication = require("../Middleware/authenticationUsers");

router.post("/", authentication, createProduct);
router.get("/", authentication, getAllProducts);
router.get("/:id", authentication, getProductById);
router.put("/:id", authentication, updateProduct);
router.delete("/:id", authentication, deleteProduct);
router.post("/:id/upload-photo", authentication, upload.single("photo"), uploadProductPhoto);

module.exports = router;
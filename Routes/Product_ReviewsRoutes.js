const express = require("express");
const router = express.Router();
const {
  createProductReview,
  getAllProductReviews,
  getProductReviewById,
  getReviewsByProductId,
  updateProductReview,
  deleteProductReview,
  uploadReviewPhoto
} = require("../Controllers/Product_ReviewsController");
const upload = require("../Middleware/uploadPhoto");
const authentication = require("../Middleware/authenticationUsers");

router.post("/", authentication, createProductReview);
router.get("/", authentication, getAllProductReviews);
router.get("/:id", authentication, getProductReviewById);
router.get("/product/:productId", authentication, getReviewsByProductId);
router.put("/:id", authentication, updateProductReview);
router.delete("/:id", authentication, deleteProductReview);
router.post("/:id/upload-photo", authentication, upload.single("photo"), uploadReviewPhoto);

module.exports = router;
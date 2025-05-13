const express = require("express");
const router = express.Router();
const {
  createWishlist,
  getAllWishlists,
  getWishlistByCustomerId,
  deleteWishlistItem
} = require("../Controllers/WishlistsController");
const authentication = require("../Middleware/authenticationUsers");

router.post("/", authentication, createWishlist);
router.get("/", authentication, getAllWishlists);
router.get("/customer/:customerId", authentication, getWishlistByCustomerId);
router.delete("/:id", authentication, deleteWishlistItem);

module.exports = router;
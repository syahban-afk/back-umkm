const { Wishlists, Customers, Products } = require("../Models");
const {
  successResponse,
  errorResponse,
  notFoundResponse,
  internalErrorResponse,
} = require("../Config/responseJson");

const createWishlist = async (req, res) => {
  try {
    const { customerId, productId } = req.body;

    const newWishlist = await Wishlists.create({
      customerId,
      productId
    });

    successResponse(res, "Wishlist item created successfully", newWishlist, 201);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getAllWishlists = async (req, res) => {
  try {
    const allWishlists = await Wishlists.findAll({
      include: [
        {
          model: Customers,
          as: 'customers',
          attributes: ['name', 'email']
        },
        {
          model: Products,
          as: 'products',
          attributes: ['name', 'price', 'productPhoto', 'description']
        }
      ]
    });
    successResponse(res, "Wishlists fetched successfully", allWishlists, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getWishlistByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const wishlist = await Wishlists.findAll({
      where: { customerId },
      include: [
        {
          model: Products,
          as: 'products',
          attributes: ['name', 'price', 'productPhoto', 'description']
        }
      ]
    });

    if (!wishlist.length) {
      return notFoundResponse(res, "Wishlist not found for this customer");
    }

    successResponse(res, "Wishlist fetched successfully", wishlist, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const deleteWishlistItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const wishlist = await Wishlists.findByPk(id);
    if (!wishlist) {
      return notFoundResponse(res, "Wishlist item not found");
    }

    await Wishlists.destroy({ where: { id } });
    successResponse(res, "Wishlist item deleted successfully", null, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

module.exports = {
  createWishlist,
  getAllWishlists,
  getWishlistByCustomerId,
  deleteWishlistItem
};
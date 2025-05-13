const { Products_Reviews, Products, Customers } = require("../Models");
const fs = require("fs");
const path = require("path");
const {
  successResponse,
  errorResponse,
  notFoundResponse,
  internalErrorResponse,
} = require("../Config/responseJson");

const createProductReview = async (req, res) => {
  try {
    const { productId, customerId, rating, comment } = req.body;

    const newReview = await Products_Reviews.create({
      productId,
      customerId,
      rating,
      comment
    });

    successResponse(res, "Product review created successfully", newReview, 201);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getAllProductReviews = async (req, res) => {
  try {
    const allReviews = await Products_Reviews.findAll({
      include: [
        {
          model: Products,
          as: 'products',
          attributes: ['name', 'productPhoto']
        },
        {
          model: Customers,
          as: 'customers',
          attributes: ['name', 'email']
        }
      ]
    });
    successResponse(res, "Product reviews fetched successfully", allReviews, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getProductReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Products_Reviews.findByPk(id, {
      include: [
        {
          model: Products,
          as: 'products',
          attributes: ['name', 'productPhoto']
        },
        {
          model: Customers,
          as: 'customers',
          attributes: ['name', 'email']
        }
      ]
    });

    if (!review) {
      return notFoundResponse(res, "Product review not found");
    }

    successResponse(res, "Product review fetched successfully", review, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Products_Reviews.findAll({
      where: { productId },
      include: [
        {
          model: Customers,
          as: 'customers',
          attributes: ['name', 'email']
        }
      ]
    });

    if (!reviews.length) {
      return notFoundResponse(res, "No reviews found for this product");
    }

    successResponse(res, "Product reviews fetched successfully", reviews, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const updateProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, photo } = req.body;

    const review = await Products_Reviews.findByPk(id);
    if (!review) {
      return notFoundResponse(res, "Product review not found");
    }

    await Products_Reviews.update(
      { rating, comment, photo },
      { where: { id } }
    );

    const updatedReview = await Products_Reviews.findByPk(id, {
      include: ['products', 'customers']
    });
    successResponse(res, "Product review updated successfully", updatedReview, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const deleteProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    const review = await Products_Reviews.findByPk(id);
    if (!review) {
      return notFoundResponse(res, "Product review not found");
    }

    await Products_Reviews.destroy({ where: { id } });
    successResponse(res, "Product review deleted successfully", null, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

async function uploadReviewPhoto(req, res) {
  try {
    const { id } = req.params;

    if (!req.file) {
      return validationErrorResponse(res, "Foto review tidak ditemukan.", 400);
    }

    const review = await Products_Reviews.findOne({ where: { id } });
    if (!review) {
      return notFoundResponse(res, "Review tidak ditemukan");
    }

    const oldPhotoPath = review.photo;

    if (oldPhotoPath) {
      const oldPhotoFullPath = path.join(__dirname, "..", oldPhotoPath);
      fs.unlinkSync(oldPhotoFullPath);
    }

    const photoPath = req.file.path;
    await Products_Reviews.update({ photo: photoPath }, { where: { id } });
    successResponse(
      res,
      "Foto review berhasil diupload.",
      null,
      200
    );
  } catch (error) {
    internalErrorResponse(res, error.message);
  }
}

module.exports = {
  createProductReview,
  getAllProductReviews,
  getProductReviewById,
  getReviewsByProductId,
  updateProductReview,
  deleteProductReview,
  uploadReviewPhoto
};
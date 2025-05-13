const { products } = require("../Models");
const fs = require("fs");
const path = require("path");
const {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  internalErrorResponse,
} = require("../Config/responseJson");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    const newProduct = await products.create({
      name,
      description,
      price,
      stock,
      categoryId
    });

    successResponse(res, "Product created successfully", newProduct, 201);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await products.findAll({
      include: ['products_categories', 'discounts', 'product_reviews', 'wishlists']
    });
    successResponse(res, "Products fetched successfully", allProducts, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await products.findByPk(id, {
      include: ['products_categories', 'discounts', 'product_reviews', 'wishlists']
    });

    if (!product) {
      return notFoundResponse(res, "Product not found");
    }

    successResponse(res, "Product fetched successfully", product, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, productPhoto, description, price, stock, categoryId } = req.body;

    const product = await products.findByPk(id);
    if (!product) {
      return notFoundResponse(res, "Product not found");
    }

    await products.update(
      { name, productPhoto, description, price, stock, categoryId },
      { where: { id } }
    );

    const updatedProduct = await products.findByPk(id);
    successResponse(res, "Product updated successfully", updatedProduct, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await products.findByPk(id);
    if (!product) {
      return notFoundResponse(res, "Product not found");
    }

    await products.destroy({ where: { id } });
    successResponse(res, "Product deleted successfully", null, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

async function uploadProductPhoto(req, res) {
  try {
    const { id } = req.params;

    if (!req.file) {
      return validationErrorResponse(res, "Foto produk tidak ditemukan.", 400);
    }

    const product = await products.findOne({ where: { id } });
    if (!product) {
      return notFoundResponse(res, "Produk tidak ditemukan");
    }

    const oldPhotoPath = product.productPhoto;

    if (oldPhotoPath) {
      const oldPhotoFullPath = path.join(__dirname, "..", oldPhotoPath);
      fs.unlinkSync(oldPhotoFullPath);
    }

    const photoPath = req.file.path;
    await products.update({ productPhoto: photoPath }, { where: { id } });
    successResponse(
      res,
      "Foto produk berhasil diupload.",
      null,
      200
    );
  } catch (error) {
    internalErrorResponse(res, error.message);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductPhoto
};
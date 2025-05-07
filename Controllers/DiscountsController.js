const { Discounts, Products, Discount_Categories } = require("../Models");
const {
  successResponse,
  errorResponse,
  notFoundResponse,
  internalErrorResponse,
} = require("../Config/responseJson");

const createDiscount = async (req, res) => {
  try {
    const { discountCategoryId, productId, percentage, validUntil } = req.body;

    const newDiscount = await Discounts.create({
      discountCategoryId,
      productId,
      percentage,
      validUntil
    });

    successResponse(res, "Discount created successfully", newDiscount, 201);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getAllDiscounts = async (req, res) => {
  try {
    const allDiscounts = await Discounts.findAll({
      include: [
        {
          model: Products,
          as: 'products',
          attributes: ['name', 'price', 'description']
        },
        {
          model: Discount_Categories,
          as: 'discount_categories',
          attributes: ['name', 'description']
        }
      ]
    });
    successResponse(res, "Discounts fetched successfully", allDiscounts, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getDiscountById = async (req, res) => {
  try {
    const { id } = req.params;
    const discount = await Discounts.findByPk(id, {
      include: [
        {
          model: Products,
          as: 'products',
          attributes: ['name', 'price', 'description']
        },
        {
          model: Discount_Categories,
          as: 'discount_categories',
          attributes: ['name', 'description']
        }
      ]
    });

    if (!discount) {
      return notFoundResponse(res, "Discount not found");
    }

    successResponse(res, "Discount fetched successfully", discount, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const { discountCategoryId, productId, percentage, validUntil } = req.body;

    const discount = await Discounts.findByPk(id);
    if (!discount) {
      return notFoundResponse(res, "Discount not found");
    }

    await Discounts.update(
      { discountCategoryId, productId, percentage, validUntil },
      { where: { id } }
    );

    const updatedDiscount = await Discounts.findByPk(id, {
      include: ['products', 'discount_categories']
    });
    successResponse(res, "Discount updated successfully", updatedDiscount, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    
    const discount = await Discounts.findByPk(id);
    if (!discount) {
      return notFoundResponse(res, "Discount not found");
    }

    await Discounts.destroy({ where: { id } });
    successResponse(res, "Discount deleted successfully", null, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount
};
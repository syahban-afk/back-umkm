const { discount_categories } = require("../Models");
const {
    successResponse,
    errorResponse,
    validationErrorResponse,
    notFoundResponse,
    internalErrorResponse,
} = require("../Config/responseJson");

const createDiscountCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const newDiscountCategory = await discount_categories.create({
            name,
            description
        });

        successResponse(res, "Discount category created successfully", newDiscountCategory, 201);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

const getAllDiscountCategories = async (req, res) => {
    try {
        const allDiscountCategories = await discount_categories.findAll({
            include: ['discounts']
        });
        successResponse(res, "Discount categories fetched successfully", allDiscountCategories, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

const getDiscountCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const discountCategory = await discount_categories.findByPk(id, {
            include: ['discounts']
        });

        if (!discountCategory) {
            return notFoundResponse(res, "Discount category not found");
        }

        successResponse(res, "Discount category fetched successfully", discountCategory, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

const updateDiscountCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const discountCategory = await discount_categories.findByPk(id);
        if (!discountCategory) {
            return notFoundResponse(res, "Discount category not found");
        }

        await discount_categories.update(
            { name, description },
            { where: { id } }
        );

        const updatedDiscountCategory = await discount_categories.findByPk(id);
        successResponse(res, "Discount category updated successfully", updatedDiscountCategory, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

const deleteDiscountCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const discountCategory = await discount_categories.findByPk(id);
        if (!discountCategory) {
            return notFoundResponse(res, "Discount category not found");
        }

        await discount_categories.destroy({ where: { id } });
        successResponse(res, "Discount category deleted successfully", null, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

module.exports = {
    createDiscountCategory,
    getAllDiscountCategories,
    getDiscountCategoryById,
    updateDiscountCategory,
    deleteDiscountCategory
};
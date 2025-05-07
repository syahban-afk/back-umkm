const { products_categories } = require("../Models");
const {
    successResponse,
    errorResponse,
    validationErrorResponse,
    notFoundResponse,
    internalErrorResponse,
} = require("../Config/responseJson");

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const newCategory = await products_categories.create({
            name
        });

        successResponse(res, "Category created successfully", newCategory, 201);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await products_categories.findAll({
            include: ['products']
        });
        successResponse(res, "Categories fetched successfully", allCategories, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await products_categories.findByPk(id, {
            include: ['products']
        });

        if (!category) {
            return notFoundResponse(res, "Category not found");
        }

        successResponse(res, "Category fetched successfully", category, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await products_categories.findByPk(id);
        if (!category) {
            return notFoundResponse(res, "Category not found");
        }

        await products_categories.update(
            { name },
            { where: { id } }
        );

        const updatedCategory = await products_categories.findByPk(id);
        successResponse(res, "Category updated successfully", updatedCategory, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await products_categories.findByPk(id);
        if (!category) {
            return notFoundResponse(res, "Category not found");
        }

        await products_categories.destroy({ where: { id } });
        successResponse(res, "Category deleted successfully", null, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
const { customers } = require("../Models");
const {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  internalErrorResponse,
} = require("../Config/responseJson");

// Create new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;

    const newCustomer = await customers.create({
      name,
      email,
      address,
      phone
    });

    successResponse(res, "Customer created successfully", newCustomer, 201);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const allCustomers = await customers.findAll({
      include: ['orders', 'product_reviews', 'wishlists']
    });
    successResponse(res, "Customers fetched successfully", allCustomers, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await customers.findByPk(id, {
      include: ['orders', 'product_reviews', 'wishlists']
    });

    if (!customer) {
      return notFoundResponse(res, "Customer not found");
    }

    successResponse(res, "Customer fetched successfully", customer, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, phone } = req.body;

    const customer = await customers.findByPk(id);
    if (!customer) {
      return notFoundResponse(res, "Customer not found");
    }

    await customers.update(
      { name, email, address, phone },
      { where: { id } }
    );

    const updatedCustomer = await customers.findByPk(id);
    successResponse(res, "Customer updated successfully", updatedCustomer, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    
    const customer = await customers.findByPk(id);
    if (!customer) {
      return notFoundResponse(res, "Customer not found");
    }

    await customers.destroy({ where: { id } });
    successResponse(res, "Customer deleted successfully", null, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
};
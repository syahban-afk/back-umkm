const { Deliveries, Orders } = require("../Models");
const {
  successResponse,
  errorResponse,
  notFoundResponse,
  internalErrorResponse,
} = require("../Config/responseJson");

const createDelivery = async (req, res) => {
  try {
    const { orderId, deliveryAddress, deliveryStatus, deliveredAt } = req.body;

    const newDelivery = await Deliveries.create({
      orderId,
      deliveryAddress,
      deliveryStatus,
      deliveredAt
    });

    successResponse(res, "Delivery created successfully", newDelivery, 201);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getAllDeliveries = async (req, res) => {
  try {
    const allDeliveries = await Deliveries.findAll({
      include: [{
        model: Orders,
        as: 'orders',
        attributes: ['id', 'customerId', 'total', 'status']
      }]
    });
    successResponse(res, "Deliveries fetched successfully", allDeliveries, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await Deliveries.findByPk(id, {
      include: [{
        model: Orders,
        as: 'orders',
        attributes: ['id', 'customerId', 'total', 'status']
      }]
    });

    if (!delivery) {
      return notFoundResponse(res, "Delivery not found");
    }

    successResponse(res, "Delivery fetched successfully", delivery, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryAddress, deliveryStatus, deliveredAt } = req.body;

    const delivery = await Deliveries.findByPk(id);
    if (!delivery) {
      return notFoundResponse(res, "Delivery not found");
    }

    await Deliveries.update(
      { deliveryAddress, deliveryStatus, deliveredAt },
      { where: { id } }
    );

    const updatedDelivery = await Deliveries.findByPk(id, {
      include: ['orders']
    });
    successResponse(res, "Delivery updated successfully", updatedDelivery, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    
    const delivery = await Deliveries.findByPk(id);
    if (!delivery) {
      return notFoundResponse(res, "Delivery not found");
    }

    await Deliveries.destroy({ where: { id } });
    successResponse(res, "Delivery deleted successfully", null, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

module.exports = {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  updateDelivery,
  deleteDelivery
};
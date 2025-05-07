const { Payments, Orders, Discounts } = require("../Models");
const {
  successResponse,
  errorResponse,
  notFoundResponse,
  internalErrorResponse,
} = require("../Config/responseJson");

const createPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, paidAt } = req.body;

    const newPayment = await Payments.create({
      orderId,
      amount,
      paymentMethod,
      paidAt
    });

    successResponse(res, "Payment created successfully", newPayment, 201);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getAllPayments = async (req, res) => {
  try {
    const allPayments = await Payments.findAll({
      include: [
        {
          model: Orders,
          as: 'orders',
          attributes: ['id', 'customerId', 'total', 'status']
        },
        {
          model: Discounts,
          as: 'discounts',
          attributes: ['percentage', 'validUntil']
        }
      ]
    });
    successResponse(res, "Payments fetched successfully", allPayments, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payments.findByPk(id, {
      include: [
        {
          model: Orders,
          as: 'orders',
          attributes: ['id', 'customerId', 'total', 'status']
        },
        {
          model: Discounts,
          as: 'discounts',
          attributes: ['percentage', 'validUntil']
        }
      ]
    });

    if (!payment) {
      return notFoundResponse(res, "Payment not found");
    }

    successResponse(res, "Payment fetched successfully", payment, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const getPaymentByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const payment = await Payments.findOne({
      where: { orderId },
      include: [
        {
          model: Orders,
          as: 'orders',
          attributes: ['id', 'customerId', 'total', 'status']
        },
        {
          model: Discounts,
          as: 'discounts',
          attributes: ['percentage', 'validUntil']
        }
      ]
    });

    if (!payment) {
      return notFoundResponse(res, "Payment not found for this order");
    }

    successResponse(res, "Payment fetched successfully", payment, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, paymentMethod, paidAt } = req.body;

    const payment = await Payments.findByPk(id);
    if (!payment) {
      return notFoundResponse(res, "Payment not found");
    }

    await Payments.update(
      { amount, paymentMethod, paidAt },
      { where: { id } }
    );

    const updatedPayment = await Payments.findByPk(id, {
      include: ['orders', 'discounts']
    });
    successResponse(res, "Payment updated successfully", updatedPayment, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const payment = await Payments.findByPk(id);
    if (!payment) {
      return notFoundResponse(res, "Payment not found");
    }

    await Payments.destroy({ where: { id } });
    successResponse(res, "Payment deleted successfully", null, 200);
  } catch (error) {
    internalErrorResponse(res, error);
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentByOrderId,
  updatePayment,
  deletePayment
};
const { Orders, Customers, Delivery, Payments, Order_Details, Products } = require("../Models");
const {
    successResponse,
    errorResponse,
    notFoundResponse,
    internalErrorResponse,
} = require("../Config/responseJson");

// Create order
const createOrder = async (req, res) => {
    try {
        const { customerId, total, status } = req.body;

        const newOrder = await Orders.create({
            customerId,
            total,
            status
        });

        successResponse(res, "Order created successfully", newOrder, 201);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

// Get all orders with related data
const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Orders.findAll({
            include: [
                {
                    model: Customers,
                    as: 'customers',
                    attributes: ['name', 'email', 'phone']
                },
                {
                    model: Delivery,
                    as: 'delivery'
                },
                {
                    model: Payments,
                    as: 'payments'
                }
            ]
        });
        successResponse(res, "Orders fetched successfully", allOrders, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

// Get detailed order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Orders.findByPk(id, {
            include: [
                {
                    model: Customers,
                    as: 'customer',
                    attributes: ['name', 'email', 'phone']
                },
                {
                    model: Delivery,
                    as: 'delivery'
                },
                {
                    model: Payments,
                    as: 'payments'
                }
            ]
        });

        if (!order) {
            return notFoundResponse(res, "Order not found");
        }

        // Get order details separately
        const orderDetails = await Order_Details.findAll({
            where: { orderId: id },
            include: [{
                model: Products,
                as: 'products',
                attributes: ['name', 'price', 'productPhoto']
            }]
        });

        const orderResponse = {
            ...order.toJSON(),
            orderDetails
        };

        successResponse(res, "Order fetched successfully", orderResponse, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, total } = req.body;

        const order = await Orders.findByPk(id);
        if (!order) {
            return notFoundResponse(res, "Order not found");
        }

        await Orders.update(
            { status, total },
            { where: { id } }
        );

        const updatedOrder = await Orders.findByPk(id, {
            include: ['customer', 'delivery', 'payments']
        });
        successResponse(res, "Order updated successfully", updatedOrder, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Orders.findByPk(id);
        if (!order) {
            return notFoundResponse(res, "Order not found");
        }

        // Delete related order details first
        await Order_Details.destroy({ where: { orderId: id } });
        // Then delete the order
        await Orders.destroy({ where: { id } });

        successResponse(res, "Order and related details deleted successfully", null, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
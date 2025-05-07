const { Order_Details, Orders, Products, Customers } = require("../Models");
const {
    successResponse,
    errorResponse,
    notFoundResponse,
    internalErrorResponse,
} = require("../Config/responseJson");

// Create order detail
const createOrderDetail = async (req, res) => {
    try {
        const { orderId, productId, quantity, price } = req.body;

        const newOrderDetail = await Order_Details.create({
            orderId,
            productId,
            quantity,
            price
        });

        successResponse(res, "Order detail created successfully", newOrderDetail, 201);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

// Get all order details with related data
const getAllOrderDetails = async (req, res) => {
    try {
        const allOrderDetails = await Order_Details.findAll({
            include: [
                {
                    model: Orders,
                    as: 'orders',
                    include: [{
                        model: Customers,
                        as: 'customer',
                        attributes: ['name', 'email']
                    }]
                },
                {
                    model: Products,
                    as: 'products',
                    attributes: ['name', 'price', 'productPhoto']
                }
            ]
        });
        successResponse(res, "Order details fetched successfully", allOrderDetails, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

// Get order details by order ID
const getOrderDetailsByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;

        const orderDetails = await Order_Details.findAll({
            where: { orderId },
            include: [
                {
                    model: Products,
                    as: 'products',
                    attributes: ['name', 'price', 'productPhoto', 'description']
                }
            ]
        });

        if (!orderDetails.length) {
            return notFoundResponse(res, "Order details not found");
        }

        // Get order information
        const order = await Orders.findByPk(orderId, {
            include: [{
                model: Customers,
                as: 'customer',
                attributes: ['name', 'email', 'phone']
            }]
        });

        const response = {
            order,
            orderDetails
        };

        successResponse(res, "Order details fetched successfully", response, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

// Update order detail
const updateOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, price } = req.body;

        const orderDetail = await Order_Details.findByPk(id);
        if (!orderDetail) {
            return notFoundResponse(res, "Order detail not found");
        }

        await Order_Details.update(
            { quantity, price },
            { where: { id } }
        );

        const updatedOrderDetail = await Order_Details.findByPk(id, {
            include: ['orders', 'products']
        });
        successResponse(res, "Order detail updated successfully", updatedOrderDetail, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

// Delete order detail
const deleteOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const orderDetail = await Order_Details.findByPk(id);
        if (!orderDetail) {
            return notFoundResponse(res, "Order detail not found");
        }

        await Order_Details.destroy({ where: { id } });
        successResponse(res, "Order detail deleted successfully", null, 200);
    } catch (error) {
        internalErrorResponse(res, error);
    }
};

module.exports = {
    createOrderDetail,
    getAllOrderDetails,
    getOrderDetailsByOrderId,
    updateOrderDetail,
    deleteOrderDetail
};
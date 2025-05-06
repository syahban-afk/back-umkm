module.exports = (sequelize, DataTypes) => {
    const order_details = sequelize.define(
        "order_details",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: "order_details",
        }
    );
    order_details.associate = function (models) {
        order_details.belongsTo(models.Orders, {
            foreignKey: 'orderId',
            as: 'orders'
        }),
        order_details.belongsTo(models.Products, {
            foreignKey: 'productId',
            as: 'products'
        });
    };
    return order_details;
};

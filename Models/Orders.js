module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define(
        "orders",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            total: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            tableName: "orders",
        }
    );
    // relasi 
    orders.associate = function (models) {
        orders.belongsTo(models.Customers, {
            foreignKey: 'customerId',
            as: 'customer'
        });
    };
    orders.hasOne(models.Delivery, {
        foreignKey: 'orderId',
        as: 'delivery'
    }),
    orders.hasOne(models.Payments, {
        foreignKey: 'orderId',
        as: 'payments'
    });
    return orders;
};

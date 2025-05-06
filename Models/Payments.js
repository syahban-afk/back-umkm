module.exports = (sequelize, DataTypes) => {
    const payments = sequelize.define(
        "payments",
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
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            paymentMethod: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            paidAt: {
                type: DataTypes.DATE,
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
            tableName: "payments",
        }
    );
    payments.associate = function (models) {
        payments.belongsTo(models.Orders, {
            foreignKey: 'orderId',
            as: 'orders'
        });
    };
    payments.hasOne(models.Discounts, {
        foreignKey: 'productId',
        as: 'discounts'
    });
    return payments;
};

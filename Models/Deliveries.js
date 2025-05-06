module.exports = (sequelize, DataTypes) => {
    const deliveries = sequelize.define(
        "deliveries",
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
            deliveryAddress: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deliveryStatus: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deliveredAt: {
                type: DataTypes.DATE,
                allowNull: false,
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
            tableName: "deliveries",
        }
    );
    deliveries.associate = function (models) {
        deliveries.belongsTo(models.Orders, {
            foreignKey: 'orderId',
            as: 'orders'
        });
    };
    return deliveries;
};

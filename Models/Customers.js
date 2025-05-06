module.exports = (sequelize, DataTypes) => {
    const customers = sequelize.define(
        "customers",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phone: {
                type: DataTypes.INTEGER,
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
            tableName: "customers",
        }
    );
    customers.hasOne(models.Orders, {
        foreignKey: 'customerId',
        as: 'orders'
    });
    customers.hasOne(models.Product_Reviews, {
        foreignKey: 'customerId',
        as: 'product_reviews'
    });
    customers.hasOne(models.Wishlist, {
        foreignKey: 'customerId',
        as: 'wishlist'
    });

    return customers;
};

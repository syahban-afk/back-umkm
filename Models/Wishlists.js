module.exports = (sequelize, DataTypes) => {
    const wishlists = sequelize.define(
        "wishlists",
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
            productId: {
                type: DataTypes.INTEGER,
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
            tableName: "wishlists",
        }
    );
    wishlists.associate = function (models) {
        wishlists.belongsTo(models.Customers, {
            foreignKey: 'customerId',
            as: 'customers'
        }),
        wishlists.belongsTo(models.Products, {
            foreignKey: 'productId',
            as: 'products'
        });
    };
    return wishlists;
};

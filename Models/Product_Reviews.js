module.exports = (sequelize, DataTypes) => {
    const products_reviews = sequelize.define(
        "products_reviews",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            photo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            comment: {
                type: DataTypes.TEXT,
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
            tableName: "products_reviews",
        }
    );
    products_reviews.associate = function (models) {
        products_reviews.belongsTo(models.Products, {
            foreignKey: 'productId',
            as: 'products'
        }),
        products_reviews.belongsTo(models.Customers, {
            foreignKey: 'customerId',
            as: 'customers'
        });
    };
    return products_reviews;
};

module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define(
        "products",
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
            productPhoto: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            categoryId: {
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
            tableName: "products",
        }
    );
    products.associate = function (models) {
        products.belongsTo(models.Products_Categories, {
            foreignKey: 'categoryId',
            as: 'products_categories'
        });
    };
    products.hasOne(models.Discounts, {
        foreignKey: 'productId',
        as: 'discounts'
    });
    products.hasOne(models.Product_Reviews, {
        foreignKey: 'productId',
        as: 'product_reviews'
    });
    products.hasOne(models.Wishlists, {
        foreignKey: 'productId',
        as: 'wishlists'
    });
    return products;
};

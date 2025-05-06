module.exports = (sequelize, DataTypes) => {
    const products_categories = sequelize.define(
        "products_categories",
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
            tableName: "products_categories",
        }
    );
    products_categories.hasOne(models.Products, {
        foreignKey: 'categoryId',
        as: 'products'
    });
    return products_categories;
};

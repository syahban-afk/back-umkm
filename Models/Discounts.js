module.exports = (sequelize, DataTypes) => {
    const discounts = sequelize.define(
        "discounts",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            discountCategoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            percentage: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            validUntil: {
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
            tableName: "discounts",
        }
    );
    discounts.associate = function (models) {
        discounts.belongsTo(models.Products, {
            foreignKey: 'productId',
            as: 'products'
        }),
            discounts.belongsTo(models.Discount_Categories, {
                foreignKey: "discountCategoryId",
                as: "discount_categories",
            })
    };
    return discounts;
};

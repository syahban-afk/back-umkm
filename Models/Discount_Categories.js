module.exports = (sequelize, DataTypes) => {
    const discount_categories = sequelize.define(
        "discount_categories",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
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
            tableName: "discount_categories",
        }
    );
    discount_categories.hasOne(models.Discounts, {
        foreignKey: 'discountCategoryId',
        as: 'discounts'
    });
    return discount_categories;
};

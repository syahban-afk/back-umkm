'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      productPhoto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: { type: Sequelize.TEXT },
      price: { type: Sequelize.FLOAT, allowNull: false },
      stock: { type: Sequelize.INTEGER, allowNull: false },
      categoryId: { type: Sequelize.INTEGER, references: { model: 'product_categories', key: 'id' } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_reviews', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      productId: { type: Sequelize.INTEGER, references: { model: 'products', key: 'id' } },
      customerId: { type: Sequelize.INTEGER, references: { model: 'customers', key: 'id' } },
      photo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rating: { type: Sequelize.INTEGER },
      comment: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_reviews');
  }
};

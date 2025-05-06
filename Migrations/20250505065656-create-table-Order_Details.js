'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('order_details', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      orderId: { type: Sequelize.INTEGER, references: { model: 'orders', key: 'id' } },
      productId: { type: Sequelize.INTEGER, references: { model: 'products', key: 'id' } },
      quantity: { type: Sequelize.INTEGER },
      price: { type: Sequelize.FLOAT },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('order_details');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wishlists', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      customerId: { type: Sequelize.INTEGER, references: { model: 'customers', key: 'id' } },
      productId: { type: Sequelize.INTEGER, references: { model: 'products', key: 'id' } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('wishlists');
  }
};

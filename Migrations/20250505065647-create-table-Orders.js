'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      customerId: { type: Sequelize.INTEGER, references: { model: 'customers', key: 'id' } },
      total: { type: Sequelize.FLOAT },
      status: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};

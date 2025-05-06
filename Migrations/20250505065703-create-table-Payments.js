'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      orderId: { type: Sequelize.INTEGER, references: { model: 'orders', key: 'id' } },
      amount: { type: Sequelize.FLOAT },
      paymentMethod: { type: Sequelize.STRING },
      paidAt: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  }
};

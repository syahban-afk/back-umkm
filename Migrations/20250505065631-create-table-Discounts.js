'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('discounts', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      discountCategoryId: { type: Sequelize.INTEGER, references: { model: 'discount_categories', key: 'id' } },
      productId: { type: Sequelize.INTEGER, references: { model: 'products', key: 'id' } },
      percentage: { type: Sequelize.FLOAT },
      validUntil: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('discounts');
  }
};

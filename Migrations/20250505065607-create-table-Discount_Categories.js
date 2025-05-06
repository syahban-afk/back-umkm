'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('discount_categories', {
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      name: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      description: { 
        type: Sequelize.STRING 
      },
      createdAt: { 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
      },
      updatedAt: { 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('discount_categories');
  }
};

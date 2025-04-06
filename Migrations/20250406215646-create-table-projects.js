"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("projects", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      projectsName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectsPhoto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      projectsTools: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      projectsCreateBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addConstraint('projects', {
      fields: ['projectsCreateBy'],
      type: 'foreign key',
      name: 'FK_projectCreateBy',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('projects', 'FK_projectCreateBy');
    await queryInterface.dropTable("projects");
  },
};

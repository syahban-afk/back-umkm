module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define(
    "projects",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      projectsName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectsPhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      projectsTools: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      projectsCreateBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
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
      tableName: "projects",
    }
  );

  Projects.associate = (models) => {
    Projects.belongsTo(models.users, {
      foreignKey: "projectsCreateBy",
    });
  };

  return Projects;
};
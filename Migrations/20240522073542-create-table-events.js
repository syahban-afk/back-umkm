module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('events', {
    eventID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    eventLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventCreateBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'events'
  });

  Events.associate = (models) => {
    Events.hasMany(models.feedback, {
      foreignKey: 'eventID'
    });
  };

  return Events;
};

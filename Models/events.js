module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define('events', {
        id: {
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
        }
    }, {
        tableName: 'events',
    });

    Events.associate = (models) => {
        Events.hasMany(models.feedback, {
            foreignKey: 'eventID'
        });
    };

    return Events;
};

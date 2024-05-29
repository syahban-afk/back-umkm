module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('feedback', {
        feedbackID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        eventID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'events',
                key: 'eventID'
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'feedback',
    });

    Feedback.associate = (models) => {
        Feedback.belongsTo(models.users, {
            foreignKey: 'userID'
        });
        Feedback.belongsTo(models.events, {
            foreignKey: 'eventID'
        });
    };

    return Feedback;
};

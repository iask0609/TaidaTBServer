
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('CheckInfo', {
        ServiceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Service',
                key: 'ServiceID'
            }
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false,
            references: {
                model: 'OrdinaryUser',
                key: 'UserID'
            }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'CheckInfo'
    })
};

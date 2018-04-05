/**
 * 这个是视图
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*|{}|void}
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ServiceList', {
        ServiceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Remark: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Province:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        City:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        District:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: false
        },
        DemandStartTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        Content: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'ServiceList'
    })
};

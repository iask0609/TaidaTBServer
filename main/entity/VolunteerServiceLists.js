/**
 * 这个是视图
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*|{}|void}
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('volunteerservicelists', {
        VolunteerServiceID: {
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
        DemandStartTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        DemandEndTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        RealStartTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        RealEndTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        Status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ContentID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CreateTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        Duration: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'volunteerservicelists'
    })
};

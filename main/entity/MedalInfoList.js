/**
 * 这个是视图
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*|{}|void}
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('MedalInfoList', {
        ServiceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        volunteerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        oldmanId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Status:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        TransferHASH:{
            type: DataTypes.STRING,
            allowNull: true
        },
        medalnum:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        getmedaltime: {
            type: DataTypes.TIME,
            allowNull: true
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'MedalInfoList'
    })
};

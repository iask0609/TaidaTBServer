
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('CheckNoticeView', {

        NoticeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        WriterName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Content: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ReleaseTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        Checked:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Effectiveness:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Visibility:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'CheckNoticeView'
    })
};

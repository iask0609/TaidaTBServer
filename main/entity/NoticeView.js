
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('NoticeView', {

        NoticeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
        UserName: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'NoticeView'
    })
};

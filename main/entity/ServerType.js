
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ServerType', {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      item:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false
      }
    }, {
      createdAt: false,
      updatedAt: false,
      tableName: 'ServerType'
    })
  };
  
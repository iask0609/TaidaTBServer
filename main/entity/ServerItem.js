
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ServerItem', {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      itemID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
            model: 'ServerType',
            key: 'ID'
          }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      info: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      servertime: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      difficulty: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      junior: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      senior: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      disability: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      medalnum: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      }
    }, {
      createdAt: false,
      updatedAt: false,
      tableName: 'ServerItem'
    })
  };
  
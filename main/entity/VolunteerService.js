
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('volunteerservice', {
      VolunteerServiceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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
      CreateTime: {
        type: DataTypes.TIME,
        allowNull: false,
        primaryKey: false
      },
      Duration: {
          type: DataTypes.DOUBLE,
        allowNull: false
      },
      Content: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
          references: {
              model: 'ServerItem',
              key: 'ID'
            }
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
        allowNull: false
      },
      Remark: {
        type: DataTypes.STRING,
        allowNull: true
      }
  
    }, {
      createdAt: false,
      updatedAt: false,
      tableName: 'volunteerservice'
    })
  };
  
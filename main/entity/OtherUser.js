
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OtherUser', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'AllUser',
        key: 'UserID'
      }
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: false
    },
    Gender: {
      type: DataTypes.String,
      allowNull: true
    },
    Photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IDNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Phone: {
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
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'OtherUser'
  })
};

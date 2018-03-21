
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Demand', {
    ServiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Service',
        key: 'ServiceID'
      }
    },
    Account: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      references: {
        model: 'OrdinaryUser',
        key: 'Account'
      }
    },
    postForm: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'Demand'
  })
};

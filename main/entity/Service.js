
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Service', {
    ServiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CreateTime: {
      type: DataTypes.TIME,
      allowNull: false,
      primaryKey: false
    },
    Duration: {
      type: DataTypes.INTEGER,
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
    ContractChainHASH: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TransferHASH:{
      type: DataTypes.STRING,
      allowNull: false
    },
    medalnum:{
      type: DataTypes.DOUBLE,
      allowNull:true
    },
    getmedaltime:{
      type: DataTypes.TIME,
      allowNull: true
    }

  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'Service'
  })
};

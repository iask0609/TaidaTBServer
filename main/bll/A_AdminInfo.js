const dao = require('../dao/_index');
const demand = require('../util/ormSequelize').Demand;
const a_AdminInfo = require('../util/ormSequelize').A_AdminInfo;

function getA_AdminInfo(ReturnList){
    a_AdminInfo.findAndCountAll({
    }).then(function(res){
        return ReturnList(res);
    })
  }

exports.getA_AdminInfo=getA_AdminInfo;
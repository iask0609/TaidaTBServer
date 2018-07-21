const dao = require('../dao/_index');
const demand = require('../util/ormSequelize').Demand;
const ordinaryUserInfo = require('../util/ormSequelize').OrdinaryUserInfo;

function getOrdinaryUserInfo(ReturnList){
    ordinaryUserInfo.findAndCountAll({
    }).then(function(res){
        return ReturnList(res);
    })
  }

exports.getOrdinaryUserInfo=getOrdinaryUserInfo;
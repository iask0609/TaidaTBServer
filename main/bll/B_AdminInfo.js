const dao = require('../dao/_index');
const demand = require('../util/ormSequelize').Demand;
const b_AdminInfo = require('../util/ormSequelize').B_AdminInfo;

function getB_AdminInfo(ReturnList){
    b_AdminInfo.findAndCountAll({
    }).then(function(res){
        return ReturnList(res);
    })
  }

exports.getB_AdminInfo=getB_AdminInfo;
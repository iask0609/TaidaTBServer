const service = require('../util/ormSequelize').Service;
const Demand = require('../util/ormSequelize').Demand;
const Application = require('../util/ormSequelize').Application;
const getUserAddress = require('../bll/AllUser.js').getUserAddress;

function insertService(ServiceID, CreateTime, Duration, Content,
  DemandStartTime, DemandEndTime, Status,
  ContractChainHASH, TransferHASH, returnNum) {
  service.create({
    "ServiceID": ServiceID,
    "CreateTime": CreateTime,
    "Duration": Duration,
    "Content": Content,
    "DemandStartTime": DemandStartTime,
    "DemandEndTime": DemandEndTime,
    "Status": Status,            // 当为0时说明还未被满足，为1时说明已被满足
    "ContractChainHASH": ContractChainHASH,
    "TransferHASH": TransferHASH
  }).then(function(result) {
    console.log('insertService ok');
    console.log(result.message);
    return returnNum(1);
  }).catch(function(err) {
    console.log('insertService error');
    console.log(err.message);
    return returnNum(0);
  })
}

function selectServiceByServiceID(ServiceID, ReturnList) {
  service.findAndCountAll({
    where: {
      "ServiceID": ServiceID
    }
  }).then(function(result) {
    var list = [];
    for (var i = 0; i < result.count; i++) {
      list.push(result.rows[i])
    }
    return ReturnList(list)
  }).catch(function(err) {
    console.log('selectServiceByServiceID error');
    console.log(err.message)
  })
}

function updateService(ServiceID, Duration, content, DemandStartTime, DemandEndTime, returnNum) {
  service.findAndCountAll({
    where: {
      "ServiceID": ServiceID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this service is not exist.')
      } else {
        service.update({
          "Duration": Duration,
          "Content": content,
          "DemandStartTime": DemandStartTime,
          "DemandEndTime": DemandEndTime
        }, {
          where: {
            "ServiceID": ServiceID
          }
        }
        ).then(function(result) {
          console.log('updateService ok');
          return returnNum(1);
        }).catch(function(err) {
          console.log('updateService error');
          return returnNum(0);
        })
      }
    }
  )
}

function updateServiceFromVolunteer(ServiceID, RealStartTime, RealEndTime, returnNum)
{
  service.findAndCountAll({
      where: {
          "ServiceID": ServiceID
      }
  }).then(function (result) {
      if (result.count === 0) {
          console.log('this service is not exist.')
      } else {
          service.update({
                  "Status": 2,
                  "RealStartTime": RealStartTime,
                  "RealEndTime": RealEndTime
              }, {
                  where: {
                      "ServiceID": ServiceID
                  }
              }
          ).then(function(result) {
              console.log('updateServiceFromVolunteer ok');
              return returnNum(1);
          }).catch(function(err) {
              console.log('updateServiceFromVolunteer error');
              console.log(err.message);
              return returnNum(0);
          })
      }
  })
}

function deleteServiceByServiceID(ServiceID) {
  service.findAndCountAll({
    where: {
      "ServiceID": ServiceID
    }
  }).then(function(result) {
    if (result.count === 0) {
      console.log('this Service is not exist.')
    } else {
      service.destroy({
        where: {
          "ServiceID": ServiceID
        }
      })
    }
  })
}

function updateMedalStatue(ServiceID, medalnum, getmedaltime, returnNum) {
  service.findAndCountAll({
    where: {
      "ServiceID": ServiceID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this service is not exist.')
      } else {
        service.update({
          "medalnum": medalnum,
          "getmedaltime": getmedaltime
        }, {
          where: {
            "ServiceID": ServiceID
          }
        }
        ).then(function(result) {
          console.log('updateMedalStatue ok');
          return returnNum(1);
        }).catch(function(err) {
          console.log('updateMedalStatue error');
          return returnNum(0);
        })
      }
    }
  )
}
function updateContractHash(ServiceID, address){
  service.update({
    "ContractChainHASH":address
  },{
    where:{
      "ServiceID":ServiceID
    }
  }).then((result)=>{
    console.log('set contract address ok');
  });
}

function selectContractHash(ServiceID, callback){
  service.findAndCountAll({
    where:{
      "ServiceID":ServiceID
    }
  }).then((result)=>{
    callback(result.rows[0].dataValues.ContractChainHASH)
  });
}

function getServiceInfo(ServiceID, ServiceInfo){
  Demand.findAndCountAll({
    where:{
      'ServiceID': ServiceID
    }
  }).then((demand)=>{
    var UserID1 = demand.rows[0].dataValues.UserID;
    Application.findAndCountAll({
      where:{
        'ServiceID': ServiceID
      }
    }).then((applicate)=>{
      var UserID2 = applicate.row[0].dataValues.UserID;
      getUserAddress(UserID1, (UserAdderss1)=>{
        getUserAddress(UserID2, (UserAdderss2)=>{
          ServiceInfo(UserID1,UserAdderss1,UserID2,UserAdderss2);
        })
      });
    })
  })
}

exports.insertService = insertService;
exports.selectServiceByServiceID = selectServiceByServiceID;
exports.updateService = updateService;
exports.deleteServiceByServiceID = deleteServiceByServiceID;
exports.updateServiceFromVolunteer = updateServiceFromVolunteer;
exports.updateMedalStatue = updateMedalStatue;
exports.updateContractHash = updateContractHash;
exports.selectContractHash = selectContractHash;
exports.getServiceInfo = getServiceInfo;
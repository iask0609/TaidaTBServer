const service = require('../util/ormSequelize').Service;

function insertService(ServiceID, CreateTime, Duration, Content,
  DemandStartTime, DemandEndTime, Status,
  ChainHASH, returnNum) {
  service.create({
    "ServiceID": ServiceID,
    "CreateTime": CreateTime,
    "Duration": Duration,
    "Content": Content,
    "DemandStartTime": DemandStartTime,
    "DemandEndTime": DemandEndTime,
    "Status": Status,            // 当为0时说明还未被满足，为1时说明已被满足
    "ChainHASH": ChainHASH
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

function updateService(ServiceID, Duration, content, DemandStartTime, DemandEndTime) {
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
          "content": content,
          "DemandStartTime": DemandStartTime,
          "DemandEndTime": DemandEndTime
        }, {
          where: {
            "ServiceID": ServiceID
          }
        }
        ).then(function(result) {
          console.log('updateService ok');
          console.log(result.message)
        }).catch(function(err) {
          console.log('updateService error');
          console.log(err.message)
        })
      }
    }
  )
}

function updateServiceFromVolunteer(ServiceID, RealStartTime, RealEndTime)
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
              console.log(result.message)
          }).catch(function(err) {
              console.log('updateServiceFromVolunteer error');
              console.log(err.message)
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

exports.insertService = insertService;
exports.selectServiceByServiceID = selectServiceByServiceID;
exports.updateService = updateService;
exports.deleteServiceByServiceID = deleteServiceByServiceID;
exports.updateServiceFromVolunteer = updateServiceFromVolunteer;

const demand = require('../util/ormSequelize').Demand;

function insertDemand(ServiceID, UserID, Remark, returnNum) {
  demand.create({
    "ServiceID": ServiceID,
    "UserID": UserID,
    "Remark": Remark
  }).then(function(result) {
    console.log('insertDemand ok');
    console.log(result.message);
    return returnNum(1);
  }).catch(function(err) {
    console.log('insertDemand error');
    console.log(err.message);
    return returnNum(0);
  })
}

function getOldManIDByServiceID(ServiceID,returnNum) {
    demand.findAndCountAll({
        where:{"ServiceID": ServiceID}
    }).then(function (value) {
        returnNum=value.rows[0].dataValues.UserID;
        console.log("success")
        return returnNum;
    }).catch(function(err) {
        console.log('insertDemand error');
        console.log(err.message);
        return returnNum(0);
    })
}

function updateDemand(ServiceID, UserID, Remark, returnNum) {
  demand.findAndCountAll({
    where: {
      "ServiceID": ServiceID,
      "UserID": UserID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this Demand is not exist.')
      } else {
        demand.update({
          "Remark": Remark
        }, {
          where: {
            "ServiceID": ServiceID,
            "UserID": UserID
          }
        }
        ).then(function(result) {
          console.log('updateDemand ok');
          return returnNum(1);
        }).catch(function(err) {
          console.log('updateDemand error');
            return returnNum(0);
        })
      }
    }
  )
}

exports.insertDemand = insertDemand;
exports.updateDemand = updateDemand;

exports.getOldManIDByServiceID = getOldManIDByServiceID;

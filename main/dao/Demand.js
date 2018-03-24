const demand = require('../util/ormSequelize').Demand;

function insertDemand(ServiceID, Account, postForm) {
  demand.create({
    'ServiceID': ServiceID,
    'Account': Account,
    'postForm': postForm
  }).then(function(result) {
    console.log('insertDemand ok');
    console.log(result.message)
  }).catch(function(err) {
    console.log('insertDemand error');
    console.log(err.message)
  })
}

function updateDemand(ServiceID, Account, postForm) {
  demand.findAndCountAll({
    where: {
      'ServiceID': ServiceID,
      'Account': Account
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this Demand is not exist.')
      } else {
        demand.update({
          'postForm': postForm
        }, {
          where: {
            'ServiceID': ServiceID,
            'Account': Account
          }
        }
        ).then(function(result) {
          console.log('updateDemand ok');
          console.log(result.message)
        }).catch(function(err) {
          console.log('updateDemand error');
          console.log(err.message)
        })
      }
    }
  )
}

exports.insertDemand = insertDemand;
exports.updateDemand = updateDemand;

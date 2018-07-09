const Servertype = require('../util/ormSequelize').ServerType;

function insertServerType(ID,item) {
  Servertype.create({
    "ID": ID,
    "item": item
  }).then(function(result) {
    console.log('insertServerType ok');
    console.log(result.message)
  }).catch(function(err) {
    console.log('insertServerType error');
    console.log(err.message)
  })
}

function updateServerType(ID,item) {
  Servertype.findAndCountAll({
    where: {
      "ID": ID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this ServerType is not exist.')
      } else {
        Servertype.update({
          "item": item
        }, {
          where: {
            "ID": ID
          }
        }
        ).then(function(result) {
          console.log('updateServerType ok');
          console.log(result.message)
        }).catch(function(err) {
          console.log('updateServerType error');
          console.log(err.message)
        })
      }
    }
  )
}

function deleteServerTypeByID(ID) {
  Servertype.findAndCountAll({
    where: {
      "ID": ID
    }
  }).then(function(result) {
    if (result.count === 0) {
      console.log('this ServerType is not exist.')
    } else {
      Servertype.destroy({
        where: {
          "ID": ID
        }
      })
    }
  })
}

exports.insertServerType = insertServerType;
exports.updateServerType = updateServerType;
exports.deleteServerTypeByID = deleteServerTypeByID;

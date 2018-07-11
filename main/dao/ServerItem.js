const serveritem = require('../util/ormSequelize').ServerItem;

function insertServerItem(ID, itemID, type, content, info, servertime, difficulty, junior, senior ,disability, medalnum) {
  serveritem.create({
    "ID": ID,
    "itemID": itemID,
    "type": type,
    "content": content,
    "info": info,
    "servertime": servertime,
    "difficulty": difficulty,
    "junior": junior,
    "senior": senior,
    "disability": disability,
    "medalnum": medalnum
  }).then(function(result) {
    console.log('insertServerItem ok');
    console.log(result.message);
    return returnNum(1);
  }).catch(function(err) {
    console.log('insertServerItem error');
    console.log(err.message);
    return returnNum(0);
  })
}

function updateServerItem(ID, content, info, servertime, difficulty, junior, senior ,disability, medalnum) {
  serveritem.findAndCountAll({
    where: {
      "ID": ID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this ServerItem is not exist.')
      } else {
        serveritem.update({
          "content": content,
          "info": info,
          "servertime": servertime,
          "difficulty": difficulty,
          "junior": junior,
          "senior": senior,
          "disability": disability,
          "medalnum": medalnum
        }, {
          where: {
            "ID": ID
          }
        }
        ).then(function(result) {
          console.log('updateServerItem ok');
          console.log(result.message)
        }).catch(function(err) {
          console.log('updateServerItem error');
          console.log(err.message)
        })
      }
    }
  )
}

function deleteServerItemByID(ID) {
  serveritem.findAndCountAll({
    where: {
      "ID": ID
    }
  }).then(function(result) {
    if (result.count === 0) {
      console.log('this ServerItem is not exist.')
    } else {
      serveritem.destroy({
        where: {
          "ID": ID
        }
      })
    }
  })
}

function selectAllItems(ReturnList) {
  serveritem.findAndCountAll({

  }).then(function(result) {
    // var list = [];
    // for (var i = 0; i < result.count; i++) {
    //   list.push(result.rows[i])
    // }
    return ReturnList(result);
  }).catch(function(err) {
    console.log('selectAllItems error');
    console.log(err.message)
  })
}

function selectItemsByType(itemID, ReturnList) {
  serveritem.findAndCountAll({
    where: {
      "itemID": itemID
    }
  }).then(function(result) {
    var list = [];
    for (var i = 0; i < result.count; i++) {
      list.push(result.rows[i])
    }
    return ReturnList(list)
  }).catch(function(err) {
    console.log('selectItemsByType error');
    console.log(err.message)
  })
}

exports.insertServerItem = insertServerItem;
exports.updateServerItem = updateServerItem;
exports.deleteServerItemByID = deleteServerItemByID;
exports.selectAllItems = selectAllItems;
exports.selectItemsByType = selectItemsByType;

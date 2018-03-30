const otherUser = require('../util/ormSequelize').OtherUser;

function insertOtherUser(UserID, UserName, Gender, Photo, Name,
  IDNumber, Email, Phone, Address) {
  otherUser.create({
    "UserID": UserID,
    "UserName": UserName,
    "Gender": Gender,
    "Photo": Photo,
    "Name": Name,
    "IDNumber": IDNumber,
    "Email": Email,
    "Phone": Phone,
    "Address": Address
  }).then(function(result) {
    console.log('insertOtherUser ok');
    console.log(result.message)
  }).catch(function(err) {
    console.log('insertOtherUser error');
    console.log(err.message)
  })
}

function selectOtherUserByUserID(UserID, ReturnList) {
  otherUser.findAndCountAll({
    where: {
      "UserID": UserID
    }
  }).then(function(result) {
    var list = [];
    for (var i = 0; i < result.count; i++) {
      list.push(result.rows[i])
    }
    return ReturnList(list)
  }).catch(function(err) {
    console.log('selectAdministrator error');
    console.log(err.message)
  })
}

function updateOtherUserByUserID(UserID, Gender, Name, IDNumber, Email, Phone, returnNum) {
  otherUser.findAndCountAll({
    where: {
      "UserID": UserID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this user is not exist.')
      } else {
        otherUser.update({
          "Gender": Gender,
          "Name": Name,
          "IDNumber": IDNumber,
          "Email": Email,
          "Phone": Phone
        }, {
          where: {
            "UserID": UserID
          }
        }
        ).then(function() {
          console.log('updateOtherUser ok');
          return returnNum(1);
        }).catch(function() {
          console.log('updateOtherUser error');
          return returnNum(0);
        })
      }
    }
  )
}

exports.insertOtherUser = insertOtherUser;
exports.selectOtherUserByUserID = selectOtherUserByUserID;
exports.updateOtherUserByUserID = updateOtherUserByUserID;

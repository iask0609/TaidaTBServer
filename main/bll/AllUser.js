const allUser = require('../util/ormSequelize').AllUser;
const otherUser=require('../util/ormSequelize').OtherUser;
const dao = require('../dao/_index');

/**
 * 用户登陆
 * @param Account
 * @param Password
 * @param theRes
 * theRes:-1--用户不存在；0--超级管理员；1--A级管理员；2--B级管理员；3--普通用户
 */
function allUserLogin(Account, Password, theRes)
{
  allUser.findAndCountAll({
    where: {
      "Account": Account,
      "Password": Password
    }
  }).then(function(result) {
      var num;
    if (result.count === 0) {
        num = -1;
        return theRes(num);
    }
    const userId = result.rows[0].dataValues.UserID;
    // 检查是否是超级管理员
    dao.selectSuperAdminByUserID(userId, function(count){
        if (count === 1) {
            num = 0;
            return theRes(num);
        }
        else{
            // 检查是否是A级管理员
            dao.selectA_AdminByUserID(userId, function(count){
                if (count === 1) {
                    num = 1;
                    return theRes(num);
                }
                else{
                    // 检查是否是B级管理员
                    dao.selectB_AdminByUserID(userId, function (count) {
                        if (count === 1) {
                            num = 2;
                            return theRes(num);
                        }
                        else{
                            // 检查是否是普通用户
                            dao.selectOrdinaryUserByUserID(userId, function (count) {
                                if (count === 1) {
                                    num = 3;
                                    return theRes(num);
                                }
                            });
                        }
                    });
                }
            });
        }
    });

  })
}

/**
 * 获取个人信息
 * @param UserId
 * @param returnList
 */
function getUserInfo(UserId, returnList)
{
    otherUser.findAndCountAll({
    where: {
      "UserID": UserId
    }
  }).then(function (res) {
      if(res.count === 0){
          return returnList("该用户不存在");
      }
      else{
          return returnList(res.rows[0].dataValues);
      }
    })
}

exports.allUserLogin = allUserLogin;
exports.getUserInfo=getUserInfo;

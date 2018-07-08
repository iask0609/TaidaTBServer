const allUser = require('../util/ormSequelize').AllUser;
const otherUser=require('../util/ormSequelize').OtherUser;
const ordinaryUser=require('../util/ormSequelize').OrdinaryUser;
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

/*
* 用户信息注册
 */
function userRegister(account,username,password,phone,email,gender,province,city,district,IDNumber,returnNum)
{
    var num=-1;
    //首先判断用户名是否重复
    allUser.findAndCountAll({
        where:{ "Account": account}
    }).then(function (value) {
        num=value.count;
        if(num==0){
            //账户不重复才能创建用户
            var userId=-1;
            allUser.create({
                "Account": account,
                "Password": password,
                "ChainHASH": 'unknown'
            }).then(function(result){
                console.log("得到的object"+result);
    
                // 获取userId
                allUser.findAndCountAll({
                    where:{ "Account": account}
                }).then(function (value) {
                    console.log("获取userid"+value);
                    userId=value.rows[0].dataValues.UserID;
    
                //通过调用web在链上创建账户
                    otherUser.create({
                        "UserID": userId,
                        "UserName": account,
                        "Gender": gender,
                        "Name": username,
                        "IDNumber": IDNumber,
                        "Email": email,
                        "Phone": phone,
                        "Province": province,
                        "City": city,
                        "District": district
                    }).then(function (value) {
                        console.log('insertOtherUser ok'+value);
                        dao.insertOrdinaryUser(userId,0,0);
                        return returnNum(1);
                    })
    
                })
    
            })
    
        }else{
            return returnNum(0);
        }
    })
}

/**
     * 根据用户账号获取ID
     * @param Account
     * @param UserID
     */
function getUserIDbyAccount(Account, UserID)
{
    allUser.findAndCountAll({
        where: {
            "Account": Account
        }
    }).then(function (res) {
        if(res.count === 0){
            return UserID(-1);
        }
        else{
            return UserID(res.rows[0].dataValues.UserID);
        }
    })
}

exports.allUserLogin = allUserLogin;
exports.getUserInfo=getUserInfo;
exports.userRegister=userRegister;
exports.getUserIDbyAccount = getUserIDbyAccount;

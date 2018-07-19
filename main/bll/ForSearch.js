const otherUser = require('../util/ormSequelize').OtherUser;
const ordinaryUser = require('../util/ormSequelize').OrdinaryUser;
const dao = require('../dao/_index');
/**
 * 查询所有的用户信息
 * @param returnList
 * @param UserId
 */

function getAllUsers(returnList){
    otherUser.findAndCountAll({

    }).then(function(res){
        return returnList(res);
    })
}

/**
 * 按照条件查询用户信息
 */
function getUsersByCondition(UserID, UserName, Name, IDNumber, returnList){
        // return returnList(res);
        otherUser.findAndCountAll({
            where:{
                $or: 
                [
                    {
                        "UserID": UserID
                    },
                    {
                        "UserName": UserName
                    },
                    {
                        "Name": Name
                    },
                    {
                        "IDNumber": IDNumber
                    }
                ]
            }
        }).then(function(res){
            if(res.count === 0){
                return returnList();
            }
            else{
                console.log(res)
                var UserID = res.rows[0].dataValues.UserID;
                var UserName = res.rows[0].dataValues.UserName;
                var Name = res.rows[0].dataValues.Name;
                var IDNumber = res.rows[0].dataValues.IDNumber;
                // return returnList(res);
                var list = [];
                for(var i =0; i < res.count; i++){
                    if(res.rows[i].dataValues.UserID === UserID){
                            list.push(res.rows[i].dataValues);
                        }
                    else if(res.rows[i].dataValues.UserName === UserName){
                            list.push(res.rows[i].dataValues);
                        }
                    else if(res.rows[i].dataValues.Name === Name){
                            list.push(res.rows[i].dataValues);
                        }
                    else if(res.rows[i].dataValues.IDNumber === IDNumber){
                            list.push(res.rows[i].dataValues);
                        }
                    }

                return returnList(list);
            }
        })
}


/**
 * 设置权限
 */
function ChangeAuthority(UserID){
    // return returnList(res);
    ordinaryUser.findAndCountAll({
        where:{
            "UserID": UserID
        }
    }).then(function(res){
        if(res.row.dataValues.CanCheck === 0){
            res.row.dataValues.CanCheck = 1
        }
        else{
            res.row.dataValues.CanCheck=0
        }
    })
}


exports.getAllUsers = getAllUsers;
exports.getUsersByCondition = getUsersByCondition;
exports.ChangeAuthority = ChangeAuthority;
const demand = require('../util/ormSequelize').Demand;
const service = require('../util/ormSequelize').Service;
const dao = require('../dao/_index');
const serviceList = require('../util/ormSequelize').ServiceList;
const otherUser = require('../util/ormSequelize').OtherUser;

/**
 * 老人发布新的需求
 * @param UserId
 * @param Content
 * @param DemandStartTime
 * @param DemandEndTime
 * @param Duration
 * @param Remark
 * @param returnNum
 */
function postNewRequirement(UserId, Content, DemandStartTime, DemandEndTime, Duration, Remark, returnNum)
{
    const myDateTime  = new Date();
    service.findAndCountAll({
        'order': [
            ['ServiceID', 'DESC']
        ]
    }).then(function (result) {
        // 无法保证并发情况下ServiceID的唯一性
        var ServiceID = -1;
        if(result.count > 0)
        {
            ServiceID = result.rows[0].dataValues.ServiceID + 1;
        }
        else
        {
            ServiceID = 0;
        }
        console.log(ServiceID + myDateTime.toLocaleString());
        dao.insertService(ServiceID, myDateTime.toLocaleString(), Duration, Content, DemandStartTime, DemandEndTime, 0,
            -1,-1, function(num){
            if(num === 1){
                dao.insertDemand(ServiceID, UserId, Remark, function(num1){
                    if(num1 === 1){
                        return returnNum(1);
                    }
                    else
                    {
                        return returnNum(0);
                    }
                });
            }
            else{
                return returnNum(0);
            }
            });
    });

    // console.log("sdf" + UserId + Content + DemandStartTime + DemandEndTime + Duration + Remark);
}

/**
 * 根据老人的ID获取他发布的所有需求
 * @param UserID
 * @param returnList
 */
function getDemandByUserID(UserID, returnList){
    demand.findAndCountAll({
        where: {
            "UserID": UserID
        }
    }).then(function(res){
        var list = [];
        var serviceID = -1;
        for(var i = 0; i < res.count; i++){
            serviceID = res.rows[i].dataValues.ServiceID;
            service.findAndCountAll({
                where:{
                    "ServiceID": serviceID
                }
            }).then(function(res1){
                list.push(res1.rows[0].dataValues);
            })
        }
        setTimeout(function(){
            console.log(list);
            return returnList(list);
        }, 500);
    })
}

/**
 * 更新老人的某个需求
 * @param UserID
 * @param ServiceID
 * @param Duration
 * @param content
 * @param DemandStartTime
 * @param DemandEndTime
 * @param Remark
 */
function updateDemand(UserID, ServiceID, Duration, content, DemandStartTime, DemandEndTime, Remark, returnNum)
{
    dao.updateDemand(ServiceID, UserID, Remark, function(num){
        if(num === 1){
            dao.updateService(ServiceID, Duration, content, DemandStartTime, DemandEndTime, function (num1) {
                return returnNum(num1);
            });
        }
        else{
            return returnNum(num);
        }
    });
}

/**
 * 查询所有未被服务的老人需求
 * @param returnList
 */
function getAllDemand(UserID,returnList){
    //不应查到自己发布的需求
    serviceList.findAndCountAll({
        where:{
            // "UserID": {
            //     $not:[UserID]
            // }
        }
    }).then(function(res){
        return returnList(res);
    })
}

/**
 * 条件查询老人的需求
 * @param UserId
 * @param Content
 * @param Duration
 * @param DemandStartTime
 * @param type
 * @param returnList
 */
function getDemandByCondition(UserID, Content, Duration, DemandStartTime, type, returnList){

    serviceList.findAndCountAll({
        where:{

            "Content": {
                "$like": "%" + Content + "%"
            },
            "Duration": Duration,
            "DemandStartTime":{
                "$gte": DemandStartTime
            }
        }
    }).then(function(res){
        // return returnList(res);
        otherUser.findAndCountAll({
            where:{
                "UserID": UserID
            }
        }).then(function(res1){
            if(res1.count === 0){
                return returnList();
            }
            else{
                var province = res1.rows[0].dataValues.Province;
                var city = res1.rows[0].dataValues.City;
                var distinct = res1.rows[0].dataValues.District;
                // return returnList(res);
                console.log(type);
                var list = [];
                if(type == 1){
                    for(var i =0; i < res.count; i++){
                        if(res.rows[i].dataValues.District === distinct){
                            list.push(res.rows[i].dataValues);
                        }
                    }
                    return returnList(list);
                }
                if(type == 2){
                    for(var i =0; i < res.count; i++){
                        if(res.rows[i].dataValues.City === city){
                            list.push(res.rows[i].dataValues);
                        }
                    }
                    return returnList(list);
                }
                if(type == 3){
                    for(var i =0; i < res.count; i++){
                        if(res.rows[i].dataValues.Province === province){
                            list.push(res.rows[i].dataValues);
                        }
                    }
                    return returnList(list);
                }
                if(type == 4){
                    return returnList(res);
                }else
                {
                    return returnList();
                }
            }
        })
    })
}

function getDemandByConditionNoDuration(UserID, Content, DemandStartTime, type, returnList){

    serviceList.findAndCountAll({
        where:{

            "Content": {
                "$like": "%" + Content + "%"
            },

            "DemandStartTime":{
                "$gte": DemandStartTime
            }
        }
    }).then(function(res){
        // return returnList(res);
        otherUser.findAndCountAll({
            where:{
                "UserID": UserID
            }
        }).then(function(res1){
            if(res1.count === 0){
                return returnList();
            }
            else{
                var province = res1.rows[0].dataValues.Province;
                var city = res1.rows[0].dataValues.City;
                var distinct = res1.rows[0].dataValues.District;
                // return returnList(res);
                console.log(type);
                var list = [];
                if(type == 1){
                    for(var i =0; i < res.count; i++){
                        if(res.rows[i].dataValues.District === distinct){
                            list.push(res.rows[i].dataValues);
                        }
                    }
                    return returnList(list);
                }
                if(type == 2){
                    for(var i =0; i < res.count; i++){
                        if(res.rows[i].dataValues.City === city){
                            list.push(res.rows[i].dataValues);
                        }
                    }
                    return returnList(list);
                }
                if(type == 3){
                    for(var i =0; i < res.count; i++){
                        if(res.rows[i].dataValues.Province === province){
                            list.push(res.rows[i].dataValues);
                        }
                    }
                    return returnList(list);
                }
                // if(type == 4){
                //     return returnList(res);
                // }
                // else{
                //     return returnList();
                // }
                return returnList(res);
            }
        })
    })
}

exports.postNewRequirement = postNewRequirement;
exports.getDemandByUserID = getDemandByUserID;
exports.updateDemand = updateDemand;
exports.getAllDemand = getAllDemand;
exports.getDemandByCondition = getDemandByCondition;
exports.getDemandByConditionNoDuration=getDemandByConditionNoDuration;
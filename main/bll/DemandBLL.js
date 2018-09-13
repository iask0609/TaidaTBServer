const demand = require('../util/ormSequelize').Demand;
const service = require('../util/ormSequelize').Service;
const dao = require('../dao/_index');
const serviceLists = require('../util/ormSequelize').ServiceLists;
const otherUser = require('../util/ormSequelize').OtherUser;
const volunteerservice = require('../util/ormSequelize').VolunteerService;
const volunteerserviceLists = require('../util/ormSequelize').VolunteerServiceLists;

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
    const myDateTime  = new Date().toISOString().slice(0, 19).replace('T', ' ');
    service.findAndCountAll({
        'order': [
            ['ServiceID', 'DESC']
        ]
    }).then(function (result) {
        let ServiceID = 1;
        if(result.count > 0)
        {
            ServiceID = result.rows[0].dataValues.ServiceID + 1;
        }
        else
        {
            ServiceID = 1;
        }
        console.log(ServiceID +'   '+ myDateTime);
        dao.insertService(ServiceID, myDateTime, Duration, Content, DemandStartTime, DemandEndTime, 0,
            -1,-1,0, function(num){
            if(num === 1){
                dao.insertDemand(ServiceID, UserId, Remark, function(num1){
                    if(num1 === 1){
                        returnNum(1);
                    }
                    else
                    {
                        returnNum(0);
                    }
                });
            }
            else{
                returnNum(0);
            }
            });
    });

}


/**
 * 志愿者发布能够提供的服务需求
 * @param UserId
 * @param Content
 * @param DemandStartTime
 * @param DemandEndTime
 * @param Duration
 * @param Remark
 * @param returnNum
 */
function postNewApplication(UserId, Content, DemandStartTime, DemandEndTime, Duration, Remark, returnNum)
{
    const myDateTime  = new Date().toISOString().slice(0, 19).replace('T', ' ');
    volunteerservice.findAndCountAll({
        'order': [
            ['VolunteerServiceID', 'DESC']
        ]
    }).then(function (result) {
        let VolunteerServiceID = 1;
        if(result.count > 0)
        {
            VolunteerServiceID = result.rows[0].dataValues.VolunteerServiceID + 1;
        }
        else
        {
            VolunteerServiceID = 1;
        }
        console.log(VolunteerServiceID +'   '+ myDateTime);

        dao.insertVolunteerService(VolunteerServiceID, UserId, myDateTime, Duration, Content, DemandStartTime, DemandEndTime, 0, Remark, function(num){
            if(num === 1){
                returnNum(1);
            }else{
                returnNum(0);
            }
        });

    });


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
        if(res.count==0){
            returnList(res)
        }else{
            HandleList(res,(list)=>{
                returnList(list);
            })
        }
        
    })
}
/**
 * 处理getDemandByUserID异步
 */
function HandleList(res,callback){
    var list = [];
    var serviceID = -1;
    for(var i = 0; i < res.count; i++){
        serviceID = res.rows[i].dataValues.ServiceID;
        serviceLists.findAndCountAll({
            where:{
                "ServiceID": serviceID
            }
        }).then(function(res1){
            list.push(res1.rows[0].dataValues);
            if(list.length==res.count){
                callback(list)
            }
        })
    }
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
 * 查询所有未被响应的志愿者可提供服务
 * @param returnList
 */
function getAllVolunteerService(UserID,returnList){
    //不应查到自己发布的需求
    volunteerserviceLists.findAndCountAll({
        where:{
            "UserID": {
                $not:[UserID]
            },
            "Status": 0
        }
    }).then(function(res){
        return returnList(res);
    })
}
/**
 * 条件查询志愿者的可提供服务
 * @param UserId
 * @param Content
 * @param Duration
 * @param DemandStartTime
 * @param type
 * @param returnList
 */
function getProvideByCondition(UserID, Content, Duration, DemandStartTime, type, returnList){

    volunteerserviceLists.findAndCountAll({
        where:{
            "ContentID": Content,
            "Duration": Duration,
            "DemandStartTime":{
                "$gte": DemandStartTime
            },
            "UserID": {
                $not:[UserID]
            },
            "Status": 0
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
                //按地区推荐
                var province = res1.rows[0].dataValues.Province;
                var city = res1.rows[0].dataValues.City;
                var distinct = res1.rows[0].dataValues.District;
                // return returnList(res);
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
                // }else
                // {
                //     return returnList();
                // }
                return returnList(res);
            }
        })
    })
}

function getProvideByConditionNoDuration(UserID, Content, DemandStartTime, type, returnList){

    volunteerserviceLists.findAndCountAll({
        where:{

            "ContentID": Content
            ,

            "DemandStartTime":{
                "$gte": DemandStartTime
            },
            "UserID": {
                $not:[UserID]
            },
            "Status": 0
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
function getProvideByConditionNoDurationNoContent(UserID, DemandStartTime, type, returnList){

    volunteerserviceLists.findAndCountAll({
        where:{

            "DemandStartTime":{
                "$gte": DemandStartTime
            },
            "UserID": {
                $not:[UserID]
            },
            "Status": 0
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
function getProvideByConditionNoContent(UserID, Duration, DemandStartTime, type, returnList){

    volunteerserviceLists.findAndCountAll({
        where:{
            "Duration": Duration,
            "DemandStartTime":{
                "$gte": DemandStartTime
            },
            "UserID": {
                $not:[UserID]
            },
            "Status": 0
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
                //按地区推荐
                var province = res1.rows[0].dataValues.Province;
                var city = res1.rows[0].dataValues.City;
                var distinct = res1.rows[0].dataValues.District;
                // return returnList(res);
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
                // }else
                // {
                //     return returnList();
                // }
                return returnList(res);
            }
        })
    })
}

/**
 * ***************************************老人与志愿者分割线************************************************
 */
/**
 * 查询所有未被服务的老人需求
 * @param returnList
 */
function getAllDemand(UserID,returnList){
    //不应查到自己发布的需求
    serviceLists.findAndCountAll({
        where:{
            "UserID": {
                $not:[UserID]
            },
            "Status": 0,
            "mutualtype":0
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

    serviceLists.findAndCountAll({
        where:{
            "ContentID": Content,
            "Duration": Duration,
            "DemandStartTime":{
                "$gte": DemandStartTime
            },
            "UserID": {
                $not:[UserID]
            },
            "Status": 0
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
                //按地区推荐
                var province = res1.rows[0].dataValues.Province;
                var city = res1.rows[0].dataValues.City;
                var distinct = res1.rows[0].dataValues.District;
                // return returnList(res);
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
                // }else
                // {
                //     return returnList();
                // }
                return returnList(res);
            }
        })
    })
}

function getDemandByConditionNoDuration(UserID, Content, DemandStartTime, type, returnList){

    serviceLists.findAndCountAll({
        where:{

            "ContentID": Content
            ,

            "DemandStartTime":{
                "$gte": DemandStartTime
            },
            "UserID": {
                $not:[UserID]
            },
            "Status": 0
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
function getDemandByConditionNoDurationNoContent(UserID, DemandStartTime, type, returnList){

    serviceLists.findAndCountAll({
        where:{

            "DemandStartTime":{
                "$gte": DemandStartTime
            },
            "UserID": {
                $not:[UserID]
            },
            "Status": 0
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
function getDemandByConditionNoContent(UserID, Duration, DemandStartTime, type, returnList){

    serviceLists.findAndCountAll({
        where:{
            "Duration": Duration,
            "DemandStartTime":{
                "$gte": DemandStartTime
            },
            "UserID": {
                $not:[UserID]
            },
            "Status": 0
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
                //按地区推荐
                var province = res1.rows[0].dataValues.Province;
                var city = res1.rows[0].dataValues.City;
                var distinct = res1.rows[0].dataValues.District;
                // return returnList(res);
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
                // }else
                // {
                //     return returnList();
                // }
                return returnList(res);
            }
        })
    })
}


/**
 * 根据service的ID删除老人发布的需求
 */
function deleteDemand(serviceID, returnNum){


    demand.findAndCountAll({
        where:{
            "ServiceID": serviceID
        }
    }).then(function(result){
        if(result.count === 0){
            returnNum(0);
        }else{
            demand.destroy({
                where:{
                    "ServiceID": serviceID
                }
            }).then(()=>{
                service.findAndCountAll({
                    where: {
                      "ServiceID": serviceID
                    }
                  }).then(function(result) {
                    if (result.count === 0) {
                      returnNum(0);
                    } else {
                        service.destroy({
                        where: {
                          "ServiceID": serviceID
                        }
                      }).then(()=>{
                           returnNum(1);
                      })
                    }
                  })
            })
        }
    })
}
/**
 * 根据service的ID修改老人发布的需求
 * @param UserID
 * @param ServiceID
 * @param Duration
 * @param content
 * @param DemandStartTime
 * @param DemandEndTime
 * @param Remark
 */
function editDemand(UserID, ServiceID, Duration, content, DemandStartTime, DemandEndTime, Remark, returnNum)
{
    dao.editDemand(ServiceID, UserID,Duration, content, DemandStartTime, DemandEndTime, Remark, function(num){
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
exports.postNewRequirement = postNewRequirement;
exports.postNewApplication = postNewApplication;
exports.getDemandByUserID = getDemandByUserID;
exports.updateDemand = updateDemand;
exports.getAllVolunteerService = getAllVolunteerService;
exports.getProvideByCondition = getProvideByCondition;
exports.getProvideByConditionNoDuration=getProvideByConditionNoDuration;
exports.getProvideByConditionNoDurationNoContent=getProvideByConditionNoDurationNoContent;
exports.getProvideByConditionNoContent=getProvideByConditionNoContent;
exports.getAllDemand = getAllDemand;
exports.getDemandByCondition = getDemandByCondition;
exports.getDemandByConditionNoDuration=getDemandByConditionNoDuration;
exports.getDemandByConditionNoDurationNoContent=getDemandByConditionNoDurationNoContent;
exports.getDemandByConditionNoContent=getDemandByConditionNoContent;
exports.deleteDemand = deleteDemand;
exports.editDemand = editDemand;
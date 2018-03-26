const demand = require('../util/ormSequelize').Demand;
const service = require('../util/ormSequelize').Service;

/**
 * 老人发布新的需求
 * @param UserId
 * @param content
 * @param DemandStartTime
 * @param DemandEndTime
 * @param Duration
 * @param Remark
 * @param returnNum
 */
function postNewRequirement(UserId, content, DemandStartTime, DemandEndTime, Duration, Remark, returnNum)
{
    const myDateTime  = new Date();
    service.findAndCountAll({
        order:"ServiceID DESC"
    }).then(function (result) {
        var ServiceID = -1;
        if(result.count > 0)
        {
            ServiceID = result.row[0].dataValues.ServiceID + 1;
        }
        else
        {
            ServiceID = 0;
        }
        service.insertService(ServiceID, myDateTime.toLocaleString(), Duration, content, DemandStartTime, DemandEndTime, 0,
            -1).then(function(){
                demand.insertDemand(ServiceID, UserId, Remark).then(function(){
                    return returnNum(1);
                })
        })
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
        var list = [];
        var serviceID = -1;
        for(var i = 0; i < res.count; i++){
            serviceID = res.row[i].dataValues.ServiceID;
            service.findAndCountAll({
                where:{
                    "ServiceID": serviceID
                }
            }).then(function(res1){
                list.push(res1.row[0].dataValues);
            })
        }
        return returnList(list);
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
function updateDemand(UserID, ServiceID, Duration, content, DemandStartTime, DemandEndTime, Remark)
{
    demand.updateDemand(ServiceID, UserID, Remark);
    service.updateService(ServiceID, Duration, content, DemandStartTime, DemandEndTime);
    return 1;
}

exports.postNewRequirement = postNewRequirement;
exports.getDemandByUserID = getDemandByUserID;
exports.updateDemand = updateDemand;
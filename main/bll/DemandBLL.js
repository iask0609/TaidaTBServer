const demand = require('../util/ormSequelize').Demand;
const service = require('../util/ormSequelize').Service;
const dao = require('../dao/_index');

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
            -1, function(num){
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
function updateDemand(UserID, ServiceID, Duration, content, DemandStartTime, DemandEndTime, Remark)
{
    demand.updateDemand(ServiceID, UserID, Remark);
    service.updateService(ServiceID, Duration, content, DemandStartTime, DemandEndTime);
    return 1;
}

exports.postNewRequirement = postNewRequirement;
exports.getDemandByUserID = getDemandByUserID;
exports.updateDemand = updateDemand;
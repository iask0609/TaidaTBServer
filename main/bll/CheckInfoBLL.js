const checkInfo=require('../util/ormSequelize').CheckInfo;
const service = require('../util/ormSequelize').Service;
const application = require('../util/ormSequelize').Application;
const demand = require('../util/ormSequelize').Demand;
const otherUser = require('../util/ormSequelize').OtherUser;

/**
 * 查询审核者的待审核申请
 * @param checkUserID
 * @param returnList
 */
function getCheckingList(checkUserID,status, returnList)
{
    checkInfo.findAndCountAll
    (
        {
            where: {
                "UserID": checkUserID,
                "status": status
            }
        }
    ).then(
        function(res)
        {
            var list = [];
            for(var i = 0; i < res.count; i++){
                var serviceID = res.rows[i].dataValues.ServiceID;
                var obj = new Object();
                obj.serviceId=serviceID;
                service.findAndCountAll({
                    where:{
                        "ServiceID": serviceID
                    }
                }).then(function(res1){

                    var temp=res1.rows[0].dataValues;
                    obj.content=temp.Content;
                    obj.startTime=temp.DemandStartTime;
                    obj.endTime=temp.DemandEndTime;
                    obj.duration=temp.Duration;
                    application.findAndCountAll({
                        where:{
                            "ServiceID": serviceID
                        }
                    }).then(function (res2) {
                        obj.volunteerID=res2.rows[0].dataValues.UserID;
                        obj.remark=res2.rows[0].dataValues.Remark;
                        otherUser.findAndCountAll({
                            where:{
                                "UserID": obj.volunteerID
                            }
                        }).then(function (value) {
                            obj.volunteerName=value.rows[0].dataValues.Name
                        })
                    })
                    demand.findAndCountAll({
                        where:{
                            "ServiceID": serviceID
                        }
                    }).then(function (value) {
                        obj.oldManID=value.rows[0].dataValues.UserID;
                        otherUser.findAndCountAll({
                            where:{
                                "UserID": obj.oldManID
                            }
                        }).then(function (value) {
                            obj.oldManName=value.rows[0].dataValues.Name
                        })
                    })
                    list.push(obj);
                })
            }
            setTimeout(function(){
                console.log("取到审核列表");
                return returnList(list);
            }, 500);

        }
    )
}

exports.getCheckingList = getCheckingList;
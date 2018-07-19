const checkInfo=require('../util/ormSequelize').CheckInfo;
const service = require('../util/ormSequelize').Service;
const application = require('../util/ormSequelize').Application;
const demand = require('../util/ormSequelize').Demand;
const otherUser = require('../util/ormSequelize').OtherUser;
const dao = require('../dao/_index');
const getUserAddress = require('./AllUser').getUserAddress;
const voteForApplication = require('../blockchain/voteForApplication');
const transact = require('../blockchain/transact');
const serviceLists = require('../util/ormSequelize').ServiceLists;

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
        function(res){
            HandleList(res,(list)=>{
                returnList(list);
            })
        }
    )
}
/**
 * 处理getCheckingList函数
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
        }).then(function (value) {
            var obj=new Object();
            obj.serviceId=value.rows[0].dataValues.ServiceID;
            obj.content=value.rows[0].dataValues.Content;
            obj.startTime=value.rows[0].dataValues.DemandStartTime;
            obj.endTime=value.rows[0].dataValues.DemandEndTime;
            obj.duration=value.rows[0].dataValues.Duration;

            application.findAndCountAll({
                where:{
                    "ServiceID": obj.serviceId
                }
            }).then(function (res2){
                obj.volunteerID=res2.rows[0].dataValues.UserID;
                obj.remark=res2.rows[0].dataValues.Remark;
                otherUser.findAndCountAll({
                    where:{
                        "UserID": obj.volunteerID
                    }
                }).then(function (value) {
                    obj.volunteerName=value.rows[0].dataValues.Name
                    demand.findAndCountAll({
                        where:{
                            "ServiceID": obj.serviceId
                        }
                    }).then(function (value2) {
                        obj.oldManID=value2.rows[0].dataValues.UserID;
                        otherUser.findAndCountAll({
                            where:{
                                "UserID": obj.oldManID
                            }
                        }).then(function (res4) {
                            obj.oldManName=res4.rows[0].dataValues.Name;
                            list.push(obj);
                            if(list.length==res.count){
                                console.log(list)
                                callback(list);
                            }
                        })
                    })
                })
            })
        })
    }
}
/**
 * 审核人给勋章申请打分
 * @param user
 * @param service
 * @param score1
 * @param score2 
 * @param score3
 * @param score4
 */
var getServiceInfo = require('../dao/Service').getServiceInfo;
function checkApplication(UserID, ServiceID, score1, score2, score3, score4){
    dao.selectContractHash(ServiceID,  (contractHash)=>{
        getUserAddress(UserID, (userAddress)=>{
            voteForApplication(UserID,userAddress, contractHash, score1, score2, score3, score4,()=>{
                checkInfo.update({
                    status: 1
                },{
                    where:{
                        ServiceID: ServiceID,
                        UserID: UserID
                    }
                })
            }, (score)=>{
                getServiceInfo(UserID, (UserID1, UserAddress1, UserID2, UserAddress2)=>{
                    transact(UserID1, UserAddress1, UserAddress2, score, (TransactionHash) => {
                        updateServiceTransaction(ServiceID, TransactionHash);
                    });
                })

            });

        })
    })
}

function updateServiceTransaction(ServiceID, TransactionHash) {
    service.update({
        TransferHASH: TransactionHash
    }, {
        where: {
            ServiceID: ServiceID
        }
    })
}

module.exports.getCheckingList = getCheckingList;
module.exports.checkApplication =  checkApplication;

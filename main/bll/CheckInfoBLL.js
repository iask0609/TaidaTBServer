const checkInfo=require('../util/ormSequelize').CheckInfo;
const service = require('../util/ormSequelize').Service;
const application = require('../util/ormSequelize').Application;
const demand = require('../util/ormSequelize').Demand;
const otherUser = require('../util/ormSequelize').OtherUser;
const dao = require('../dao/_index');
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
            if(res.count==0){
                returnList(res)
            }else{
                HandleList(res,(list)=>{
                    returnList(list);
                })
            }
            
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
            obj.startTime=value.rows[0].dataValues.RealStartTime;
            obj.endTime=value.rows[0].dataValues.RealEndTime;
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
                            console.log(res4)
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
const getServiceInfo = require('../dao/Service').getServiceInfo;
function checkApplication(UserID, ServiceID, score1, score2, score3, score4){
    dao.selectContractHash(ServiceID,  (contractHash)=>{
        let getUserAddress = require('./AllUser').getUserAddress;
        getUserAddress(UserID, (userAddress)=>{
            console.log("审核者UserAddress:" + userAddress);
            console.log("合同地址:" + contractHash);
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
                getServiceInfo(ServiceID, (UserID1, UserAddress1, UserID2, UserAddress2) => {
                    transact(UserID1, UserAddress1, UserAddress2, score * 0.1, (TransactionHash) => {
                        updateServiceTransaction(ServiceID, TransactionHash, score * 0.1);
                    });
                })

            });

        })
    })
}

function updateServiceTransaction(ServiceID, TransactionHash, medalNum) {
    service.update({
        TransferHASH: TransactionHash,
        medalnum: medalNum,
        Status: 3,
        getmedaltime: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }, {
        where: {
            ServiceID: ServiceID
        }
    })
}

module.exports.getCheckingList = getCheckingList;
module.exports.checkApplication =  checkApplication;

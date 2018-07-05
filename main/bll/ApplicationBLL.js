const application = require('../util/ormSequelize').Application;
const service = require('../util/ormSequelize').Service;
const ordinaryUser=require('../util/ormSequelize').OrdinaryUser;
const dao = require('../dao/_index');

/**
 * 查询志愿者的全部已经服务的信息
 * @param UserID
 * @param returnList
 */
function getServicedList(UserID, returnList){
    application.findAndCountAll({
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
 * 志愿者完成一次服务进行申请
 * @param UserID
 * @param ServiceID
 * @param Material1
 * @param Material2
 * @param Material3
 * @param RealStartTime
 * @param RealEndTime
 */
function applicate(UserID, ServiceID, Material1, Material2, Material3,
                   RealStartTime, RealEndTime, Remark, returnNum) {

    dao.updateApplication(ServiceID, UserID, Material1, Material2, Material3, Remark, function(num){
        if(num === 1){
            dao.updateServiceFromVolunteer(ServiceID, RealStartTime, RealEndTime, function(value){
                if(value===1){
                    dao.getAllOrdinaryUser(function(userlist)
                    {//选择审核者
                        console.log("选择审核")
                        // console.log(userlist)
                        var indexRange=userlist.count;
                        console.log("选择范围"+userlist.count)
                        var originalArray=new Array;
                        for(var j=0;j<indexRange;j++)
                        {
                            originalArray[j]=j;
                        }
                        originalArray.sort(function(){ return 0.5 - Math.random(); });
                        for(var i = 0; i < 5; i++){
                            var randomIndex=originalArray[i];
                            //random five checker
                            console.log("randomIndex"+randomIndex);
                            var checkStaffID=userlist.rows[randomIndex].dataValues.UserID;
                            dao.insertCheckInfo(ServiceID,checkStaffID,function (value2) {
                                console.log("插入成功");
                            })
                        }
                        // console.log("array");
                        // console.log(originalArray);
                    })

                }
                return returnNum(num);
            });

        }
        else{
            return returnNum(num)
        }
    });

}

/*
* 志愿者在搜索界面中点击的申请
 */
function applicateInSearch(UserID, ServiceID, returnNum) {
    dao.insertApplication(ServiceID, UserID, '0', '0', '0', '0', function(num){
        service.update({"Status": num},
            {
                where: {"ServiceID": ServiceID}
            }
        ).then(function(result) {
            return returnNum(num);
        })

    });
}

/**
 * 志愿者正在申请的服务列表
 * @param UserID
 * @param returnList
 */
function applicating(UserID, returnList) {
    application.findAndCountAll({
        where:{
            "UserID": UserID
        }
    }).then(function (result) {
        var list = [];
        var serviceID = -1;
        for(var i = 0; i < result.count; i++)
        {
            serviceID = result.rows[i].dataValues.ServiceID;
            service.findAndCountAll({
                where:{
                    "ServiceID": serviceID
                }
            }).then(function(res){
                if(res.rows[0].dataValues.status === 2)
                {
                    list.push(res.rows[0].dataValues);
                }
            })
        }
        return returnList(list);
    })
}

/**
 * 志愿者已经申请到的服务列表
 * @param UserID
 * @param returnList
 */
function applicated(UserID, returnList){
    application.findAndCountAll({
        where:{
            "UserID": UserID
        }
    }).then(function (result) {
        var list = [];
        var serviceID = -1;
        for(var i = 0; i < result.count; i++)
        {
            serviceID = result.rows[i].dataValues.ServiceID;
            service.findAndCountAll({
                where:{
                    "ServiceID": serviceID
                }
            }).then(function(res){
                if(res.rows[0].dataValues.status === 3)
                {
                    list.push(res.rows[0].dataValues);
                }
            })
        }
        return returnList(list);
    })
}

/**
 * 志愿者完成一次服务进行勋章申请
 * @param UserID
 * @param ServiceID
 * @param Material1
 * @param Material2
 * @param Material3
 * @param RealStartTime
 * @param RealEndTime
 * @param Remark
 * @param returnNum
 */
function applicateMeadls(UserID, ServiceID, Material1, Material2, Material3,
                   RealStartTime, RealEndTime, Remark, returnNum) {
    dao.updateApplication(ServiceID, UserID, Material1, Material2, Material3, Remark, function(num){
        if(num === 1){
            dao.updateServiceFromVolunteer(ServiceID, RealStartTime, RealEndTime, function(num){
                return returnNum(num);
            });
        }
        else{
            return returnNum(num)
        }
    });
}

/**
 * 根据ServiID获取到志愿者的信息
 * @param ServiceID
 * @param returnNum
 */
function getUserByService(ServiceID, returnList) {
    application.findAndCountAll({
        where:{
            "ServiceID": ServiceID
        }
    }).then(function (result) {
        if (result.count > 0) {
            var userID = result.row[0].dataValues.UserID;
            otherUser.findAndCountAll({
                where: {
                    "UserID": userID
                }
            }).then(function (res) {
                if (res.count > 0) {
                    return returnList(res.row[0].dataValues)
                }
                else {
                    return returnList("");
                }
            })
        }
        else {
            return returnList("");
        }
    })
}


exports.getServicedList = getServicedList;
exports.applicate = applicate;
exports.applicating = applicating;
exports.applicated = applicated;
exports.applicateMeadls = applicateMeadls;
exports.applicateInSearch=applicateInSearch;
exports.getUserByService=getUserByService;
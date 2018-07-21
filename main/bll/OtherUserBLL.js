const dao = require('../dao/_index');
const demand = require('../util/ormSequelize').Demand;
const otherUser = require('../util/ormSequelize').OtherUser;

/**
 * 修改个人信息
 * @param UserID
 * @param Gender
 * @param Name
 * @param IDNumber
 * @param Email
 * @param Phone
 * @param Province
 * @param City
 * @param District
 * @param returnNum
 */
function changeUserInformation(UserID, Gender, UserName, Name, IDNumber, Email, Phone, Province,City,District,returnNum){
    dao.updateOtherUserByUserID(UserID, Gender, UserName, Name, IDNumber, Email, Phone,Province,City,District, function(num){
        return returnNum(num);
    });
}

/**
 * 志愿者根据自己服务的ServiceID查询这个服务对应的老人的Name
 * @param ServiceID
 * @param Name
 */
function getOldManName(ServiceID, Name){
    demand.findAndCountAll({
        where: {
            "ServiceID": ServiceID
        }
    }).then(function(result){
        if(result.count === 0){
            return Name(0);
        }
        else{
            otherUser.findAndCountAll({
                where:{
                    "UserID": result.rows[0].dataValues.UserID
                }
            }).then(function(res){
                return Name(res.rows[0].dataValues.Name);
            })
        }
    })
}

exports.changeUserInformation=changeUserInformation;
exports.getOldManName=getOldManName;
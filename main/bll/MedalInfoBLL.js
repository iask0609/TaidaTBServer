
const medalInfoList = require('../util/ormSequelize').MedalInfoList;


/**
 * 根据老人的ID获取勋章已转移信息
 *  @param UserID
 * @param returnList
 */

function getGiveInfo(UserID,returnList){

    medalInfoList.findAndCountAll({
        where:{
            "oldmanID": UserID,
            "Status": 3
        }
    }).then(function(res){
        return returnList(res);
    })
}

exports.getGiveInfo = getGiveInfo;
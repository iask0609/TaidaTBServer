const serverItem = require('../util/ormSequelize').ServerItem;
const dao = require('../dao/_index');
/**
 * 得到全部服务类型
 * @param resultList
 * 最后返回一个通知的list表
 */

function itemOperation(returnList)
{
    // serverItem.findAndCountAll({

    // }).then(function(res){
    //     return returnList(res);
    // })
    dao.selectAllItems(function(list){
        return returnList(list);
    })
    // serverItem.findAll().then(function (res) {
    //     return returnList(res);
    // })
}

/**
 * 得到全部服务类型
 * @param resultList
 * 最后返回一个通知的list表
 */
function itemOperationByType(itemID,returnList)
{
    dao.selectItemsByType(itemID, function(list){
        return returnList(list);
    })
}


/**
*根据服务选项的ID查看服务类型
 */

 function getServiceType(ServiceContentID,returnList)
{
    serverItem.findAndCountAll({
        where:{
            "ID": ServiceContentID,
        }
    }).then(function(res){
        return returnList(res);
    })
}


exports.itemOperation = itemOperation;
exports.getServiceType = getServiceType;
exports.itemOperationByType = itemOperationByType;
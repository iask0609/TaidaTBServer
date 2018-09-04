
const medalInfoList = require('../util/ormSequelize').MedalInfoList;
const transactionInfo = require('../blockchain/_index').transactionInfo;
const userAccount = require('../blockchain/_index').UserAccount;
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

function getGetInfo(UserID,returnList){

    medalInfoList.findAndCountAll({
        where:{
            "volunteerID": UserID,
            "Status": 3
        }
    }).then(function(res){
        return returnList(res);
    })
}
function getTransactionInfo(UserID,transactionHash, callback){

    transactionInfo(UserID, transactionHash, (reciept) => {
        callback(reciept);
    })
}


function getUserAccount(UserID,callback){
    const getUserAddress = require('./AllUser').getUserAddress;

    console.log(getUserAddress);
    getUserAddress(UserID, (UserAddress) => {
        userAccount(UserAddress, (balance) => {
            callback(balance);

        })
    })
}


exports.getGiveInfo = getGiveInfo;
exports.getGetInfo = getGetInfo;
exports.getTransactionInfo = getTransactionInfo;
exports.getUserAccount = getUserAccount;
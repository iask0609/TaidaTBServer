const dao = require('../dao/_index');

/**
 * 修改个人信息
 * @param UserID
 * @param Gender
 * @param Name
 * @param IDNumber
 * @param Email
 * @param Phone
 * @param returnNum
 */
function changeUserInformation(UserID, Gender, Name, IDNumber, Email, Phone, returnNum){
    dao.updateOtherUserByUserID(UserID, Gender, Name, IDNumber, Email, Phone, function(num){
        return returnNum(num);
    });
}

exports.changeUserInformation=changeUserInformation;
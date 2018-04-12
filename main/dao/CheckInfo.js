const checkInfo = require('../util/ormSequelize').CheckInfo;
function insertCheckInfo(ServiceID, UserID,returnNum)
{
    checkInfo.create({
        "ServiceID": ServiceID,
        "UserID": UserID,
        "status": 0
    }).then(function (result) {

        console.log('insertCheckInfo ok');
        return returnNum(1);
    }).catch(function(err) {
        console.log('insertCheckInfo error'+err);
        return returnNum(0);
    })
}

function updateCheckInfo(ServiceID, UserID,returnNum)
{
    checkInfo.findAndCountAll({
        where: {
            "ServiceID": ServiceID,
            "UserID": UserID
        }
    }).then(function (result) {
        if (result.count === 0) {
            console.log('this CheckInfo is not exist.')
        } else{
            checkInfo.update({
                "status": 1
            },{
                where: {
                    "ServiceID": ServiceID,
                    "UserID": UserID
                }
            }).then(function (value) {
                console.log('updateCheckInfo ok');
                return returnNum(1);
            }).catch(function(err){
                console.log('updateCheckInfo error');
                return returnNum(0);
            })

        }
    })
}

exports.insertCheckInfo = insertCheckInfo;
exports.updateCheckInfo = updateCheckInfo;
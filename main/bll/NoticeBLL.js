const noticeView = require('../util/ormSequelize').NoticeView;
const otherUser=require('../util/ormSequelize').OtherUser;
const checkNoticeView = require('../util/ormSequelize').CheckNoticeView;
const checkNotice = require('../util/ormSequelize').CheckNotice;
/**
 * 得到全部通知
 * @param resultList
 * 最后返回一个通知的list表
 */
function noticeOperation(UserID,returnList)
{


    // noticeView.findAll().then(function (res) {
    //     return returnList(res);
   // console.log("testbllfun");
   checkNoticeView.findAndCountAll({
       where:{
           "UserID" : UserID
       },
       'order': [
        ['Checked', 'ASC']
    ]
   }).then(function(res){
        return returnList(res);
    })

}

function changeNoticeChecked(NoticeID,UserID){

    checkNotice.update({
        "Checked": 1 },
        {
            where:{
                "UserID": UserID,
                "NoticeID" : NoticeID
            }
        })
}

/**
 * 管理员发布新的通知
 * @param UserId
 * @param Content
 * @param Title
 * @param ReleaseTime
 * @param DeleteTime
 * @param returnNum
 */
function postNewNotice(UserId, Title, Content, ReleaseTime, DeleteTime, returnNum)
{
    const myDateTime  = new Date();
    notice.findAndCountAll({
        'order': [
            ['NoticeID', 'DESC']
        ]
    }).then(function (result) {
        var NoticeID = -1;
        if(result.count > 0)
        {
            NoticeID = result.rows[0].dataValues.NoticeID + 1;
        }
        else
        {
            NoticeID = 0;
        }
    
        dao.insertDemand(NoticeID, UserId, Title, Content, 0, 0, ReleaseTime, DeleteTime, function(num1){
            if(num1 === 1){
                return returnNum(1);
              }
            else
              {
                return returnNum(0);
              }
        });
    });

    // console.log("sdf" + UserId + Content + DemandStartTime + DemandEndTime + Duration + Remark);
}

function getAllNotice(returnList)
{
    noticeView.findAndCountAll({

    }).then(function(res){
        return returnList(res);
    })

}
exports.noticeOperation = noticeOperation;
exports.changeNoticeChecked = changeNoticeChecked;
exports.postNewNotice = postNewNotice;
exports.getAllNotice = getAllNotice;
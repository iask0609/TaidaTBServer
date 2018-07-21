const noticeView = require('../util/ormSequelize').NoticeView;
const notice = require('../util/ormSequelize').Notice;
const otherUser=require('../util/ormSequelize').OtherUser;
const checkNoticeView = require('../util/ormSequelize').CheckNoticeView;
const checkNotice = require('../util/ormSequelize').CheckNotice;
const dao = require('../dao/_index');
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
function postNewNotice(UserId, Title, Content, UserLists, returnNum)
{
    const ReleaseTime  = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const DeleteTime = null;
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
            NoticeID = 1;
        }
        var list = UserLists.split(",");
        dao.insertNotice(NoticeID, UserId, Title, Content, 0, 0, ReleaseTime, DeleteTime, function(num1){
            if(num1 === 1){
                for(var i=0;i<list.length;i++){
                    dao.insertCheckNotice(NoticeID,list[i],'0');
                }
                return returnNum(1);
              }
            else
              {
                return returnNum(0);
              }
        });
    });

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
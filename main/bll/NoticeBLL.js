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

exports.noticeOperation = noticeOperation;
exports.changeNoticeChecked = changeNoticeChecked;
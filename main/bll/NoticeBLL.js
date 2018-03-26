const noticeView = require('../util/ormSequelize').NoticeView;
const otherUser=require('../util/ormSequelize').OtherUser;

/**
 * 得到全部通知
 * @param resultList
 * 最后返回一个通知的list表
 */
function noticeOperation(returnList)
{


    noticeView.findAll().then(function (res) {
        return returnList(res);
    })
}

exports.noticeOperation = noticeOperation;
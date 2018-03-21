const demand = require('../util/ormSequelize').Demand;


function demandPost(Account, postForm, theRes) {
    /**
     * 处理参数 返回响应内容 发送给数据库
     */
    demand.findAndCountAll({
        where: {
            Account: Account,
            postForm: postForm
        }
    }).then(function(result) {
        var num;
        if (result.count === 0) {
            num = -1;
            return theRes(num);
        }
        num=1;
        return theRes(num);
        /**
         * 在上一步中进行的是用户的查找，如果都没有找到用户那么返回num -1
         * 如果找到了我们应该返回1 并且插入数据
         */
    })
}


exports.demandPost = demandPost;
const application = require('../util/ormSequelize').Application;
const service = require('../util/ormSequelize').Service;

/**
 * 根据志愿者的ID查询他所申请的服务记录
 * @param UserId：志愿者ID
 * @param returnList：服务记录，也就是数据库Service表中的n条记录
 */
function volunteerApplicate(UserId, returnList) {
  application.findAndCountAll({
    where: {
      UserId: UserId
    }
  }).then(function(result) {
    var list = [];
    for (var i = 0; i < result.count; i++) {
      var serviceId = result.row(i).dataValues.ServiceID;
      service.findAndCountAll({
        where: {
          ServiceID: serviceId
        }
      }).then(function(result1) {
        list.push(result1.row(0).dataValues);
      })
    }
    return returnList(list);
  });
    /**
     *根据志愿者的ID查询他所发布过的所有可提供的服务内容
     * 暂时不需要
     */
  application.findAndServiceAll({
      where:{
        UserId:UserId
      }
  }).then(function(result){
    var list=[];
    for(var i=0;i<result.count;i++){
      var servicedId=result.row(i).dataValues.ServiceID;

    }
  });
    /**
     * 根据老人的ID查询他所发布过的所有需要被服务的内容
     * 暂时不需要
     */
  application.findAndRequestAll({

  });
}

exports.volunteerApplicate = volunteerApplicate;

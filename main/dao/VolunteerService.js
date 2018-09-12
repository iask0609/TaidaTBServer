const VolunteerService = require('../util/ormSequelize').VolunteerService;

function insertVolunteerService(VolunteerServiceID, UserID,CreateTime, Duration, Content,
    DemandStartTime, DemandEndTime, Status, Remark, returnNum) {
        VolunteerService.create({
      "VolunteerServiceID": VolunteerServiceID,
      "UserID": UserID,
      "CreateTime": CreateTime,
      "Duration": Duration,
      "Content": Content,
      "DemandStartTime": DemandStartTime,
      "DemandEndTime": DemandEndTime,
      "Status": Status,            // 当为0时说明还未被满足，为1时说明已被满足
      "Remark": Remark
    }).then(function(result) {
      console.log('insertVolunteerService ok');
      console.log(result.message);
      return returnNum(1);
    }).catch(function(err) {
      console.log('insertVolunteerService error');
      console.log(err.message);
      return returnNum(0);
    })
  }
  
  exports.insertVolunteerService = insertVolunteerService;
module.exports.allUserLogin = require('./AllUser').allUserLogin;
module.exports.getUserInfo = require('./AllUser').getUserInfo;
module.exports.volunteerApplicate = require('./OrdinaryUser').volunteerApplicate;
module.exports.noticeOperation=require('./NoticeBLL').noticeOperation;
module.exports.postNewRequirement=require('./DemandBLL').postNewRequirement;
module.exports.getDemandByUserID=require('./DemandBLL').getDemandByUserID;
module.exports.updateDemand=require('./DemandBLL').updateDemand;
module.exports.getServicedList=require('./ApplicationBLL').getServicedList;
module.exports.applicate = require('./ApplicationBLL').applicate;
module.exports.applicating = require('./ApplicationBLL').applicating;
module.exports.applicated = require('./ApplicationBLL').applicated;
module.exports.changeUserInformation = require('./OtherUserBLL').changeUserInformation;
module.exports.getOldManName = require('./OtherUserBLL').getOldManName;
module.exports.applicateMeadls = require('./ApplicationBLL').applicateMeadls;
module.exports.getAllDemand = require('./DemandBLL').getAllDemand;
module.exports.applicateInSearch = require('./ApplicationBLL').applicateInSearch;

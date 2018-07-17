module.exports.allUserLogin = require('./AllUser').allUserLogin;
module.exports.getUserInfo = require('./AllUser').getUserInfo;
module.exports.userRegister = require('./AllUser').userRegister;
module.exports.getUserIDbyAccount = require('./AllUser').getUserIDbyAccount;
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
module.exports.open = require('./test').open;
module.exports.getDemandByCondition = require('./DemandBLL').getDemandByCondition;
module.exports.getDemandByConditionNoDuration=require('./DemandBLL').getDemandByConditionNoDuration
module.exports.applicateInSearch = require('./ApplicationBLL').applicateInSearch;
module.exports.getCheckingList = require('./CheckInfoBLL').getCheckingList;
module.exports.getUserByService = require('./ApplicationBLL').getUserByService;
module.exports.addAdmin = require('./Adminstrator').addAdmin;
module.exports.itemOperation = require('./ServerItemBLL').itemOperation;
module.exports.itemOperationByType = require('./ServerItemBLL').itemOperationByType;
module.exports.checkApplication = require('./CheckInfoBLL').checkApplication;
module.exports.getGiveInfo = require('./MedalInfoBLL').getGiveInfo;
module.exports.getGetInfo = require('./MedalInfoBLL').getGetInfo;
module.exports.getTransactionInfo = require('./MedalInfoBLL').getTransactionInfo;
module.exports.changeNoticeChecked = require('./NoticeBLL').changeNoticeChecked;
module.exports.getServiceType = require('./ServerItemBLL').getServiceType;
module.exports.getMaterial = require('./ApplicationBLL').getMaterial;




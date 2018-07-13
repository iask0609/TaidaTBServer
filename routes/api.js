var express = require('express');
var router = express.Router();

const bll = require('../main/bll/_index');
const blockchain = require('../main/blockchain/_index');

/**
 * 用户登录
 */
router.post("/allUserLogin", function(req, res){
    console.log(req.body);

    bll.allUserLogin(req.body.Account, req.body.Password, function (num) {
        res.json({
            "num": num,
            "account": req.body.Account,
            "password": req.body.Password
        });
    })
});

/**
 * 用户注册
 */
router.post("/UserRegister", function(req, res){
    console.log(req.body);

    bll.userRegister(req.body.account,
        req.body.username,
        req.body.password,
        req.body.phone,
        req.body.email,
        req.body.gender,
        req.body.province,
        req.body.city,
        req.body.district,
        req.body.IDNumber,

        function (num) {
        res.json({
            "num": num
        });
    })
});

/**
 * 获取个人信息
 */
router.post("/getUserInfo", function(req, res){
    bll.getUserInfo(req.body.UserId, function (list) {

        res.json({
            "UserName": list.Name,
            "Gender": list.Gender,
            "Phone":  list.Phone,
            "Email": list.Email,
            "IDNumber": list.IDNumber,
            "Province":list.Province,
            "City":list.City,
            "District":list.District
        });
    })
});

router.post("/query", function(req, res){
    bll.query(function(num){
        res.json({
            "num": num
        });
    })
});

/**
 * 志愿者申请记录列表
 */
router.post("/volunteerApplicate", function (req, res) {
    bll.volunteerApplicate(req.body.UserID, function(list){
        res.json({
           "list": list
        });
    })
});
/*
通知请求
 */
router.post("/noticeOperation", function(req,res){
    bll.noticeOperation(function(list){
        res.json({
            "list": list
        });
    })
});

/**
 * 老人发布新的需求
 */
router.post("/postNewRequirement", function(req, res){
   bll.postNewRequirement(req.body.UserId, req.body.Content, req.body.DemandStartTime,
       req.body.DemandEndTime, req.body.Duration, req.body.Remark, function(num){
       res.json({
           "num": num
       });
       })
});

/**
 * 根据老人的ID查找其所有的需求
 */
router.post("/getDemandByUserID", function(req, res){
    bll.getDemandByUserID(req.body.UserID, function(list){
        res.json({
            "num": 1,
            "list": list
        })
    })
});

/**
 * 更新老人的某个需求
 */
router.post("/updateDemand", function(req, res){
    bll.updateDemand(req.body.UserID, req.body.ServiceID, req.body.Duration,
        req.body.Content, req.body.DemandStartTime, req.body.DemandEndTime,
        req.body.Remark, function(num){
        res.json({
            "num":num
        })
        })
});

/**
 * 根据志愿者的ID查找其所有的服务
 */
router.post("/getServicedList", function(req, res){
    bll.getServicedList(req.body.UserID, function(list){
        console.log(list);
        res.json({
            "list": list
        })
    })
});

/**
 * 志愿者进行申请
 */
router.post("/applicate", function (req, res) {
    bll.applicate(req.body.UserID, req.body.ServiceID, req.body.Material1,
        req.body.Material2, req.body.Material3, req.body.RealStartTime, req.body.RealEndTime,
        req.body.Remark,
        function (num) {
            res.json({
                "num":num
            })
        })
});


/**
 * 志愿者完成一次服务进行勋章申请
 */
router.post("/applicateMedals", function (req, res) {
    bll.applicateMeadls(req.body.UserID, req.body.ServiceID, req.body.Material1,
        req.body.Material2, req.body.Material3, req.body.RealStartTime, req.body.RealEndTime,
        req.body.Remark,
        function (num) {
            res.json({
                "num":num
            })
        })
});

/*
* 志愿者在搜索界面中点击的申请
 */
router.post("/applicateInSearch", function (req, res) {
    bll.applicateInSearch(req.body.UserID, req.body.ServiceID,
        function (num){
            res.json({
                "num":num
            })
        })
});


/**
 * 志愿者正在申请的服务列表
 */
router.post("/applicating", function(req, res){
    bll.applicating(req.body.UserID, function(list){
        res.json({
            "list": list
        })
    })
});

/**
 * 志愿者已经申请到的服务列表
 */
router.post("/applicated", function(req, res){
    bll.applicated(req.body.UserID, function(list){
        res.json({
            "list": list
        })
    })
});

/**
 * 修改个人信息
 */
router.post("/changeUserInformation", function(req, res){
    bll.changeUserInformation(req.body.UserID, req.body.Gender,
        req.body.Name, req.body.IDNumber, req.body.Email, req.body.Phone,
        req.body.Province,req.body.City,req.body.District,
        function(num){
        res.json({
            "num": num
        })
        })
});

/**
 * 志愿者根据自己服务的ServiceID查询这个服务对应的老人的Name
 */
router.post("/getOldManName", function(req, res){
    bll.getOldManName(req.body.ServiceID, function(Name){
        res.json({
            "Name": Name
        })
    })
});

/**
 * 查询所有未被服务的老人需求
 */
router.post("/getAllDemand", function(req, res){
    bll.getAllDemand(req.body.UserID, function(list){
        res.json({
            "list": list
        })
    })
});

/**
 * 条件查询老人的需求
 */
router.post("/getDemandByCondition", function(req, res){
    bll.getDemandByCondition(req.body.UserID, req.body.Content, req.body.Duration,
        req.body.DemandStartTime, req.body.type, function(list){
            res.json({
                "list": list
            })
        })
});

/**
 * 条件查询老人的需求
 */
router.post("/getDemandByConditionNoDuration", function(req, res){
    bll.getDemandByConditionNoDuration(req.body.UserID, req.body.Content,
        req.body.DemandStartTime, req.body.type, function(list){
            res.json({
                "list": list
            })
        })
});

/*
* 得到审核人员的审核列表
 */
router.post("/getCheckList",function (req,res) {
    bll.getCheckingList(req.body.UserID, req.body.status, function (list) {
        res.json({
            "num": 1,
            "list":list
        })
    })
});


/**
 * 根据用户账号获取ID
 */
router.post("/getUserIDbyAccount", function (req, res) {
    bll.getUserIDbyAccount(req.body.Account, function (num) {
        res.json({
            "UserID": num
        })
    })
});


/**
 * 根据ServiID获取到志愿者的信息
 */
router.post("/getUserByService", function(req, res) {
    bll.getUserByService(req.body.ServiceID, function (list) {
        res.json({
            "list": list
        })
    })
});

/**
 * 超级管理员添加管理员用户
 */
router.post("/addAdmin",function(req,res){
    bll.addAdmin(req.body.Account,req.body.Password,req.body.theRes,function(num){
        res.json({
            "addtype": num
        })
    })
});

/*
遍历所有服务Item
 */
router.get("/itemOperation", function(req,res){
    bll.itemOperation(function(list){
        res.json({
            "list": list
        });
    })
});

/**
 * 根据大类型遍历具体服务Item
 */
router.post("/itemOperationByType", function(req, res){
    bll.itemOperationByType(req.body.itemID, function(list){
        res.json({
            "list": list
        })
    })
});

/**
 * 查看交易链
 */
router.post("/transactionInfo",function(req,res){
    blockchain.transactionInfo(req.body.UserID,req.body.chainHash,function(list){
        res.json({
            "list":list
        })
    })
});

/**
 * 查询已转移的勋章信息
 */
router.post("/getGiveInfo", function(req, res){
    bll.getGiveInfo(req.body.UserID, function(list){
        res.json({
            "list": list
        })
    })
});
module.exports = router;

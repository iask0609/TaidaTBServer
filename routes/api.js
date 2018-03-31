var express = require('express');
var router = express.Router();

const bll = require('../main/bll/_index');

/**
 * 用户登录
 */
router.post("/allUserLogin", function(req, res){
    bll.allUserLogin(req.body.Account, req.body.Password, function (num) {


        res.json({
            "num": num,
            "account": req.body.Account,
            "password": req.body.Password
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
            "region": "[" + list.Province + "," + list.City + "," + list.District + "]"
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
 * 志愿者完成一次服务进行申请
 */
router.post("/applicate", function (req, res) {
    bll.applicate(req.body.UserID, req.body.ServiceID, req.body.Material1,
        req.body.Material2, req.body.Material3, req.body.RealStartTime, req.body.RealEndTime,
        function (num) {
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
        req.body.Name, req.body.IDNumber, req.body.Email, req.body.Phone, function(num){
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

module.exports = router;

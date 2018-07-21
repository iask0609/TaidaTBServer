var express = require('express');
var router = express.Router();

const bll = require('../main/bll/_index');
const blockchain = require('../main/blockchain/_index');
/**
 * 用户登录
 */
router.post("/allUserLogin", function(req, res){
    console.log('用户登录请求: ' + req.body);

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
    console.log("用户注册请求:" + req.body);

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
            "UserName": list.UserName,
            "Name": list.Name,
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
    bll.noticeOperation(req.body.UserID,function(list){
        res.json({
            "list": list
        });
    })
});


/*
改变通知状态
 */
router.post("/changeNoticeChecked", function(req,res){
    console.log(req.body.NoticeID)
    bll.changeNoticeChecked(req.body.NoticeID,req.body.UserID,function(list){
        res.json({
            "list": list
        });
    })
});
/**
 * 老人发布新的需求
 * Content: int
 * DemandTime datetime
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
        req.body.Material2, req.body.Material3, req.body.Material4, req.body.RealStartTime, req.body.RealEndTime,
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
            console.log(num)
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
    bll.changeUserInformation(req.body.UserID, req.body.Gender,req.body.UserName,
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

/**
 * 条件查询老人的需求
 */
router.post("/getDemandByConditionNoDurationNoContent", function(req, res){
    bll.getDemandByConditionNoDurationNoContent(req.body.UserID, req.body.DemandStartTime, req.body.type, function(list){
            res.json({
                "list": list
            })
        })
});
/**
 * 条件查询老人的需求
 */
router.post("/getDemandByConditionNoContent", function(req, res){
    bll.getDemandByConditionNoContent(req.body.UserID,req.body.Duration,
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

/*
根据服务内容ID查看服务类型内容type
 */
router.post("/getServiceType", function(req,res){

    bll.getServiceType(req.body.ServiceContentID,function(list){
        res.json({
            "list": list
        });
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
 * 勋章审核打分
 * 
 */
router.post("/checkApplication", function(req, res){
    bll.checkApplication(req.body.UserID,req.body.ServiceID,req.body.Score1,req.body.Score2,
        req.body.Score3,req.body.Score4 );
    res.json({code: 0});
});

/*
 * 查询已转移的勋章信息
 */
router.post("/getGiveInfo", function(req, res){
    bll.getGiveInfo(req.body.UserID, function(list){
        res.json({
            "list": list
        })
    })
});

/**
 * 查询已获得的勋章信息
 */
router.post("/getGetInfo", function(req, res){
    console.log("testgetinfo")
    bll.getGetInfo(req.body.UserID, function(list){
        res.json({
            "list": list
        })
    })
});

/** 
* 查询已转移的勋章信息的交易链详情 
*/
router.post("/getTransactionInfo", function(req, res){
        bll.getTransactionInfo(req.body.UserId,req.body.transactionHash,function(list){        
            res.json({           
                 "list": list        
            })    
    })
});

/**
* 查询已转移的勋章信息的交易链详情
*/
router.post("/getMaterial", function(req, res){
    bll.getMaterial(req.body.ServiceID,req.body.UserID,function(list){
        res.json({
             "list": list
        })
})
});


router.post("/uploadFile", function (req, res) {
    req.pipe(req.busboy);

    req.busboy.on('file', function (fieldname, file, filename) {
        bll.uploadFile(filename, file,function(list){
            res.json({
                 "list": list
            })}
        );
    });
});

/**
* 查询用户链上帐户余额
*/
router.post("/getUserAccount", function (req, res) {
  
    bll.getUserAccount(req.body.UserId,function(list){        
        res.json({           
             "list": list        
        })    
})

});

/**
 * *********************************************************管理员端分界线*****************************************************************************
 */
/**
 * 管理员发布新的通知
 */
router.post("/postNewNotice", function(req, res){
    if(req.body.UserLists){
        console.log(req.body.UserLists);
        var jsonStr = req.body.UserLists;
    } else {
        //不能正确解析json 格式的post参数
        var body = '', jsonStr;
        req.on('UserLists', function (chunk) {
            body += chunk; //读取参数流转化为字符串
        });
        req.on('end', function () {
            //读取参数流结束后将转化的body字符串解析成 JSON 格式
            try {
                jsonStr = JSON.parse(body);
            } catch (err) {
                jsonStr = null;
            }
            jsonStr ? res.send({"status":"success", "name": jsonStr.data.name, "age": jsonStr.data.age}) : res.send({"status":"error"});
            console.log(jsonStr)
        });
    };
    bll.postNewNotice(req.body.UserId, req.body.Title, req.body.Content, jsonStr, function(num){
        res.json({
            "num": num
        });
        })
 });

 /**
 * 查询所有用户信息
 */
router.post("/getAllUsers", function(req, res){
    bll.getAllUsers(function(list){
        res.json({
            "list": list
        })
    })
});

/**
 * 条件查询用户
 */
router.post("/getUsersByCondition", function(req, res){
    bll.getUsersByCondition(req.body.UserID, req.body.UserName, req.body.Name,
        req.body.IDNumber, function(list){
            res.json({
                "list": list
            })
        })
});

/**
 * 更改权限
 */
router.post("/ChangeAuthority", function(req, res){
    bll.ChangeAuthority(req.body.UserID, function(num){
            res.json({
                "num": num
            })
        })
});

/**
 * 获取所有通知
 */
router.post("/getAllNotice", function(req,res){
    bll.getAllNotice(function(list){
        res.json({
            "list": list
        });
    })
});

/**
 * 超级管理员添加管理员用户
 */
router.post("/addAdmin",function(req,res){
    console.log(req.body.Account);
    bll.addAdmin(req.body.Account,req.body.Password,req.body.theRes,req.body.UserName,
        req.body.Gender,req.body.IDNumber,req.body.Email,req.body.Phone,req.body.Province,
        req.body.City,req.body.District,function(num){
        res.json({
            "addtype": num
        })
    })
});

/**
 * 列出所有用户的信息
 */
router.get("/getOrdinaryUserInfo",function(req,res){
    bll.getOrdinaryUserInfo(function(list){
        res.json({
            "list":list
        })
    })
});

router.get("/getA_AdminInfo",function(req,res){
    bll.getA_AdminInfo(function(list){
        res.json({
            "list":list
        })
    })
});

router.get("/getB_AdminInfo",function(req,res){
    bll.getB_AdminInfo(function(list){
        res.json({
            "list":list
        })
    })
});

module.exports = router;
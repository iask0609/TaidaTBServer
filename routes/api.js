var express = require('express');
var router = express.Router();

const bll = require('../main/bll/_index');

router.post("/allUserLogin", function(req, res){
    bll.allUserLogin(req.body.Account, req.body.Password, function (num) {
        res.json({
            "num": num
        });
    })
});

router.post("/volunteerApplicate", function (req, res) {
    bll.volunteerApplicate(req.body.UserID, function(list){
        res.json({
           "list": list
        });
    })
})

router.post("/demandPost", function(req,res){
    bll.demandPost(req.body.Account,req.body.postForm, function(num){
        res.json({
            "num": num
        });
    })
})

module.exports = router;

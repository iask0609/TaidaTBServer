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
});

module.exports = router;

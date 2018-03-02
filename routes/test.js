var express = require('express');
var router = express.Router();

const bll = require('../main/bll/_index');
const superAdmin = require('../main/dao/SuperAdmin');

router.post("/allUserLogin", function(req, res){
    bll.allUserLogin(req.body.Account, req.body.Password, function (err) {
        res.json({
            "err":err===null?null:err.message
        });
    })
});

router.get("/test", function(req, res){
    var count = 0;
    superAdmin.selectSuperAdmin();
    res.send(count);
});

module.exports = router;

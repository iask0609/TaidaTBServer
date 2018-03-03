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

module.exports = router;

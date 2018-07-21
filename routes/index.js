var express = require('express');
var router = express.Router();
const test = require('../main/bll/test');
//const newData = require('../main/bll/newData');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/open', function(req, res) {
    test.open(function() {
      res.json({
          "num": num
      })

    })
})


// router.get("/newData", function (req, res){
//     newData.newData(function(){
//         res.json({
//             "num": num
//         })
//     })
// })


router.get("/transaction", function (req, res){
    transaction.transaction(function(){
        res.json({
            "num": num
        })
    })
})


module.exports = router;
 

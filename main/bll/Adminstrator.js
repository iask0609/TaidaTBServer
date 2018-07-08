// import { A_Admin } from '../util/ormSequelize';

// const allUser = require('../dao/AllUser')
// const otherUser = require('../dao/OtherUser')
// const administrator = require('../dao/Administrator')
// const a_admin = require('../dao/A_Admin')

const allUser = require('../util/ormSequelize').AllUser;
const a_admin = require('../util/ormSequelize').A_Admin;
const b_admin = require('../util/ormSequelize').B_Admin;
const dao = require('../dao/_index');

/**
 * 添加管理员
 * @param Account
 * @param Password
 * @param theRes
 * theRes:1--A级管理员；2--B级管理员
 */
function addAdmin(Account, Password, theRes, returnnum) {
    var num=-1;
    //首先判断用户名是否重复
    allUser.findAndCountAll({
        where:{ "Account": Account}
    }).then(function (value) {
        num=value.count;
        console.log("num："+ num)
        if(num>0){
            return returnnum(0);
        }
        else{
            var userId=-1;
            if(theRes==1){
                //创建A管理员
                allUser.create({
                    "Account": Account,
                    "Password": Password,
                    "ChainHASH": 'unknown'
                }).then(function(result){
                    console.log("得到的object"+result);
                    // 获取userId
                    allUser.findAndCountAll({
                        where:{ "Account": Account}
                    }).then(function (value) {
                        console.log("获取userid"+value);
                        userId=value.rows[0].dataValues.UserID;
                        //通过调用web在链上创建账户
                        a_admin.create({
                            "UserID": userId
                        }).then(function (value) {
                            console.log('inserta_admin ok'+value);
                            dao.insertA_Admin(userId)
                            return returnnum(1);
                        })
                        })
                })
            }
            else if(theRes==2){
                //创建B管理员
                allUser.create({
                    "Account": Account,
                    "Password": Password,
                    "ChainHASH": 'unknown'
                }).then(function(result){
                    console.log("得到的object"+result);
                    // 获取userId
                    allUser.findAndCountAll({
                        where:{ "Account": Account}
                    }).then(function (value) {
                        console.log("获取userid"+value);
                        userId=value.rows[0].dataValues.UserID;
                        //通过调用web在链上创建账户
                        b_admin.create({
                            "UserID": userId
                        }).then(function (value) {
                            console.log('inserta_admin ok'+value);
                            dao.insertB_Admin(userId)
                            return returnnum(2);
                        })
                        })
                })
            }else{
                //选择类型有误
                return returnnum(-1);
            }
        }
        
    })
    
}
exports.addAdmin = addAdmin ;

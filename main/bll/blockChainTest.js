var Web3 = require("web3");
var web3 = new Web3("http://localhost:8591");
var Eth = require("web3-eth");
var eth = new Eth('http://localhost:8591');
var Personal = require('web3-eth-personal');
var personal = new Personal('http://localhost:8591');
var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('http://localhost:8591');


// var account_two = eth.accounts[1];
// console.log(account_two);

personal.newAccount('123456');
var account_one = eth.accounts[0];
console.log(account_one);


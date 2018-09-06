const Node = require('./gethProcess');
const config = require('./config');

function checkNum(userID, contractHash,callback) {


    let node = new Node(userID);
    let web3 = node.getSuperWeb3();
    let contract = new web3.eth.Contract(config.abiDefinition, contractHash);
    contract.methods.getProposalCount().call().then(function (result) {
        callback(result);
        console.log("已审核人数" + result);
    });

}

exports.checkNum = checkNum;

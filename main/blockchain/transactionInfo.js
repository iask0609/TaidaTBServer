const Node = require('./gethProcess');

function transactionInfo(userId, transactionHash, callback)
{
    let node = new Node(userId);
    let web3 = node.getSuperWeb3();
    web3.eth.getTransactionReceipt(transactionHash).then(function (receipt) {
        callback(receipt);
        console.log("交易区块编号：" + receipt.blockNumber);
        console.log("交易区块Hash值：" + receipt.blockHash);
        console.log("交易Hash值：" + receipt.transactionHash);
        console.log("交易发送方地址：" + receipt.from);
    });
}

exports.transactionInfo = transactionInfo;


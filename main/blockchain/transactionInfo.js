const Node = require('./gethProcess');

function transactionInfo(userId, transactionHash, callback)
{
    let node = new Node(userId);
    node.start((web3, child) => {
        web3.eth.getTransactionReceipt(transactionHash).then(function (receipt) {
            callback(receipt);
            console.log("交易区块编号：" + receipt.blockNumber);
            console.log("交易区块Hash值：" + receipt.blockHash);
            console.log("交易Hash值：" + receipt.transactionHash);
            console.log("交易发送方地址：" + receipt.from);
            setTimeout(() => child.kill(), 1000 * 60 * 2);
        });
    });
}

exports.transactionInfo = transactionInfo;


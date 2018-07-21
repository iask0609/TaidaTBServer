const Node = require('./gethProcess');
const config = require('./config');

function voteForApplication(userID, userAddress, contractHash, score1, score2, score3, score4, updateDB, sendCoin) {
    let node = new Node(userID);
    node.start((web3, child)=>{
        let contract = new web3.eth.Contract(config.abiDefinition, contractHash);
        web3.eth.personal.unlockAccount(userAddress, '123456').then((response) => {
            contract.methods.getProposalCount().call().then((result) => {
                console.log("审核人数" + result);
            });
            console.log("start scoring");
            contract.methods.scoring(score1, score2, score3, score4).send({
                from: userAddress,
                gas: '0x2fefd8',
                gasPrice: '18000000005'
            }).on('transactionHash', (hash) => {
                console.log("审核打分transactionHash:" + hash);
            }).on('receipt', (receipt) => {
                console.log(receipt);
                console.log('score ok');
                contract.methods.getProposalCount().call().then((result) => {
                    console.log("已审核人数" + result);
                    if(result >= 4)
                    {
                        contract.methods.getResult().call().then((scoreList) => {
                            console.log(scoreList);
                            let sum = 0;
                            for (let i = 0; i < scoreList.length; i++) {
                                sum += parseInt(scoreList[i]);
                            }
                            let score = sum / scoreList.length;
                            console.log('最终得分情况:' + score);
                            sendCoin(score);
                        })
                    }
                });
                setTimeout(child.kill, 3 * 60 * 1000);
            }).catch((err) => {
                console.log("审核sendTransaction error:" + err);
                child.kill();
            });
        })
    });
    updateDB();
}

module.exports = voteForApplication;

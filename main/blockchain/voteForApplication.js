var Node = require('./gethProcess');
var config = require('./config')

function voteForApplication(userID,userAddress, contractHash, score1, score2, score3, score4, sendCoin){
    node = Node(userID);
    node.start((web3, child)=>{
        var contract = new web3.eth.Contract(config.abiDefinition, contractHash);
        web3.eth.personal.unlockAccount(UserAddress,'123456', 10000).then((response)=>{
            contract.methods.scoring(score1, score2, score3, score4).send({
                from: userAddress
            }).then((reciept)=>{
                console.log('score ok');
                contract.methods.getProposalCount.call().then((result)=>{
                    if(result >= 4)
                    {
                        contract.methods.getResult.call().then((score)=>{
                            sendCoin(score);
                        })
                    }
                })
            })

        })
    })
}

module.exports = voteForApplication;

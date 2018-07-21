let Node = require('../blockchain/gethProcess.js');
const transact = require('./transact');

function AddUserNode(userId, updateAddress)
{
    let userNode = new Node(userId);
    userNode.init(()=> userNode.start(function callback(web3,child){
        web3.eth.personal.newAccount('123456').then((userhash) => {
            updateAddress(userhash, () => {
                setTimeout(() => child.kill(), 1000 * 60 * 3);
            });
            let superWeb3 = userNode.getSuperWeb3();
            superWeb3.eth.getCoinbase((error, coinbase) => {
                transact(1, coinbase, userhash, 5, (hash) => {
                    console.log('init transaction ok')
                });
            })
        }).catch((err) => {
            console.log('unlock account error:' + err);
            child.kill();
        })
    })
    );

}
module.exports = AddUserNode;
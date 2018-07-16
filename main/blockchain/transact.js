var Node = require('./gethProcess');
const config = require('./config');

function transact(UserID1, UserAddress1, UserAddress2, coin, updateService) {
    node = Node(UserID1);
    node.start((web3, child)=>{
        web3.eth.personal.unlockAccount(UserAddress,'123456', 10000).then((response)=>{
            web3.eth.sendTransaction({
                from: UserAddress1,
                to:UserAddress2,
                value: coin
            }).on('transactionHash', function (hash) {
                updateService(hash);
            })
        })
    })
}

var Node = require('./gethProcess');
const config = require('./config');

function transact(UserID1, UserAddress1, UserAddress2, coin, updateService) {
    node = new Node(UserID1);
    node.start((web3, child)=>{
        web3.eth.personal.unlockAccount(UserAddress1, '123456', 10000).then((response) => {
            web3.eth.sendTransaction({
                from: UserAddress1,
                to:UserAddress2,
                value: web3.utils.toWei(String(coin), 'ether'),
                gas: '0x2fefd8',
                gasPrice: '18000000000'
            }).on('transactionHash', function (hash) {
                updateService(hash);
            }).on('receipt', function (receipt) {
                console.log(receipt);
                setTimeout(() => child.kill(), 60 * 1000 * 2);
            })
        })
    })
}

module.exports = transact;
const Node = require('./gethProcess');

function UserAccount(UserAddress, callback)
{

    let node = new Node(1);
    let web3 = node.getSuperWeb3();
    web3.eth.getBalance(UserAddress).then((balance) => {
        let coin = web3.utils.fromWei(balance, 'ether');
        callback(coin);
    })

}

exports.UserAccount = UserAccount;
const Node = require('./gethProcess');
function UserAccount(UserID,callback)
{
   
    let node = new Node(UserID);
    node.start((web3, child) => {
        web3.eth.getBalance(web3.eth.getAccount(console.log)).then(function(useraccount){
            callback(useraccount);
            console.log("账户余额" + useraccount);
            setTimeout(() => child.kill(), 1000 * 60 * 2);
        });
    });
}

exports.UserAccount = UserAccount;
let Node = require('../blockchain/gethProcess.js');

function AddUserNode(userId, updateAddress)
{
    let userNode = Node(userId);
    userNode.init(()=> userNode.start(function callback(web3,child){
        web3.eth.personal.newAccount('123456').then((userhash) => {
            updateAddress(userhash, () => {
                if (child.kill())
                    console.log('process ' + userId + ' killed successfully');
            });
        }).catch((err) => {
            console.log('unlock account error:' + err);
        })

    })
    )
}
module.exports = AddUserNode;
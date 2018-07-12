var Node = require('../blockchain/gethProcess.js')

function AddUserNode(userId, updateAddress)
{
    var userNode = Node(userId);
    userNode.init(userNode.start((web3,child)=>{
        web3.eth.personal.newAccount('123456').then((userhash) => {
            updateAddress(userhash,()=>child.kill());
     });
    })
    )
}
module.exports = AddUserNode;
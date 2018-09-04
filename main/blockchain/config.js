module.exports = {
    basePath: '/root/TimeBank/BlockChain',
    nodeFile:function nodeFile(UserID){
        return this.basePath + '/node' + parseInt(UserID); //注意base路径和file路径之间的"/"
    },
    rpcport: function rpcport(UserID){
        return parseInt(UserID)+8500;
    },
    port: function port(UserID)
    {
        return parseInt(UserID)+30300;
    },
    baseEnode: "enode://fa0250c1665c31f7aad34eea0c5f62c5058d41eaf1c5a8f8b53483b3ce3e6441ea331ce2218e4b8f056a4bf77babef6020729c8acef21e20e0d54ee06189d005@127.0.0.1:30301",
    host:'http://localhost',
    abiDefinition: JSON.parse('[{"constant":true,"inputs":[],"name":"getProposalId","outputs":[{"name":"theId","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"proposal","outputs":[{"name":"id","type":"uint256"},{"name":"voteCount","type":"uint256"},{"name":"serviceContentScore","type":"uint256"},{"name":"serviceTimeScore","type":"uint256"},{"name":"serviceAttitudeScore","type":"uint256"},{"name":"elderlyEvaluation","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sponsor","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"voted","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"score0","type":"uint256"},{"name":"score1","type":"uint256"},{"name":"score2","type":"uint256"},{"name":"score3","type":"uint256"}],"name":"scoring","outputs":[{"name":"err","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getExample","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getProposalCount","outputs":[{"name":"theVoteCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getResult","outputs":[{"name":"result","type":"uint256[4]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"id","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
};

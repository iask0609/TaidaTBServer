module.exports = {
    basePath : '/home/suzy/文档/blockChain',
    nodeFile:function nodeFile(UserID){
        return this.basePath+'node'+parseInt(UserID);
    },
    rpcport: function rpcport(UserID){
        return parseInt(UserID)+8500;
    },
    port: function port(UserID)
    {
        return parseInt(UserID)+30300;
    },
    host:'http://localhost'
}

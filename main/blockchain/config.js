module.exports = {
    basePath : '/home/lzh/Projects/BlockChain/',
    nodeFile:function nodeFile(UserID){
        return this.basePath+'node'+UserID;
    },
    rpcport: function rpcport(UserID){
        return UserID+8500;
    },
    port: function port(UserID)
    {
        return UserID+30300;
    },
    host:'http://localhost'
}

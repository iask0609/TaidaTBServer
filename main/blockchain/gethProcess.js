const config = require('./config.js')
const Web3 = require('web3');

function Node(UserID){
    return{
        cwd:config.basePath,
        rpcport: config.rpcport(UserID),
        nodeFile:config.nodeFile(UserID),
        host: config.host,
        port: config.port(UserID),
        initCommand: "geth --datadir " + config.nodeFile(UserID) + " init genesis.json",
        startCommand: "geth --rpc --rpcport \"" + config.rpcport(UserID) + "\" --datadir " + config.nodeFile(UserID) +  " --port \"" + config.port(UserID) + "\" --rpcapi \"eth,web3,personal\"",
        init: function (callback){
            var that = this;
            var exec = require('child_process').exec;
            exec(this.initCommand,
            {cwd: that.cwd},
            (error, stdout, stderr)=> {
                if(error)
                {
                    console.log('error:' + error);
                    return;
                }
                else
                {
                    console.log(UserID + '\'snode in '+ that.nodeFile+ ' successfully created');
                    if(callback)
                        callback();
                }
            }
        );
        },
        start: function(work){
            var that = this;
            var exec = require('child_process').exec;
            var child = exec(this.startCommand, {cwd: that.cwd});
            var url = this.host + ':'+this.rpcport;
            setTimeout(() => {
                var web3 = new Web3(new Web3.providers.HttpProvider(url));
                work(web3, child);
            }, 3000); 
        }
    }
}

module.exports = Node;
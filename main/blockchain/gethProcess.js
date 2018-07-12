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
        startCommand: "geth --rpc --rpcport \"" + config.rpcport(UserID) + "\" --datadir " + this.nodeFile +  " --port \"" + this.port + "\" --rpcapi \"eth,web3,personal\"",
        init: function (callback){
            var that = this;
            var exec = require('child_process').exec;
            console.log(that.initCommand);
            exec(this.initCommand,
            {cwd: that.cwd},
            (error, stdout, stderr)=> {
                if(error)
                {
                    console.log(error);
                    return;
                }
                console.log(UserID + '\'snode in '+ that.nodeFile+ 'successfully created');
                if(callback == undefined)
                    return;
                else
                    callback();
            }
        );
        },
        start: function(work){
            var that = this;
            var exec = require('child_process').exec;
            var child = exec(this.startCommand, {cwd: that.cwd});
            var web3 = new Web3(new Web3.providers.HttpProvider(this.host + ':'+this.rpcport));
            work(web3, child);
        }
    }
}

module.exports = Node;
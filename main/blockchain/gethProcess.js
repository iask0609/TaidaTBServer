const config = require('./config.js');
const Web3 = require('web3');
const child = require('child_process');

function Node(UserID){
    return{
        cwd:config.basePath,
        rpcport: config.rpcport(UserID),
        nodeFile:config.nodeFile(UserID),
        host: config.host,
        port: config.port(UserID),
        initArgs: ['--datadir', config.nodeFile(UserID), 'init', 'genesis.json'],
        startArgs: ['--rpc', '--rpcport', config.rpcport(UserID), '--datadir', config.nodeFile(UserID), '--port', config.port(UserID), '--rpcapi', 'eth,web3,personal'],
        init: function (callback){
            let child1 = child.spawn('geth', this.initArgs, {cwd: this.cwd});
            child1.on('exit', () => {
                console.log(UserID + '\'s node in ' + this.nodeFile + ' successfully created');
                callback();
            });
            child1.on('error', (msg) => {
                console.log('init node error: ' + msg);
            })
        },
        start: function(work){
            let child1 = child.spawn('geth', this.startArgs, {cwd: this.cwd});
            let url = this.host + ':' + this.rpcport;
            setTimeout(() => {
                let web3 = new Web3(new Web3.providers.HttpProvider(url));
                work(web3, child1);
            }, 3000); 
        },
        web3: function(){
            let url = this.host + ':' + this.rpcport;
            let web3 = new Web3(new Web3.providers.HttpProvider(url));
            console.log('web3 connect to ' + url);
            return web3;
        }
    }
}

module.exports = Node;
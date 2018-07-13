function AddUserNode(userId,callback)
{
    //var userId = this.userId;
    console.log('AddID:'+userId)
    var name = 'node' + userId;
    var rpcport = String(8500 + parseInt(userId));
    var port = String(30300 + parseInt(userId));
    var command0 = "geth --datadir " + name + " init genesis.json";
    var command1 = "geth --identity \"TestNode\" --rpc --rpcport \"" + rpcport + "\" --datadir " + name +  " --port \"" + port + "\" --rpcapi \"eth,web3,personal\" console";
    var website = "http://localhost:" + rpcport;
  
    var exec = require('child_process').exec;
   // var userhash = 'undefined00';
    var child1 = exec(command0
        ,{cwd: '/home/suzy/文档/blockChain'},
        function (error, stdout, stderr) {
             var child2 = exec(command1
            ,{cwd: '/home/suzy/文档/blockChain'},
            function (error, stdout, stderr) {
                    console.log('stdout2: ' + stdout);
                    console.log('stderr2: ' + stderr);
                if (error !== null) {
                console.log('exec error2: ' + error);
                     }
             });
            
             setTimeout(()=>{  
                    var Web3 = require('web3');

                    var web3 = new Web3(new Web3.providers.HttpProvider(website));
                   
                    var Eth = require('web3-eth');
                    var eth = new Eth(website);

                    
                    var Personal = require('web3-eth-personal');
                    var personal = new Personal(website);

                   web3.eth.personal.newAccount('123456').then(function (userhash) {
                       callback(userhash);
                    console.log("USERHASH???????"+userhash);
                });
                   setTimeout(()=>{  
                    
                     child2.kill();
                   },5000);
             },3000);
            console.log('stdout1: ' + stdout);
            console.log('stderr1: ' + stderr);
            if (error !== null) {
                console.log('exec error1: ' + error);
            }

            
        });
        
        
    }
    exports.AddUserNode = AddUserNode;
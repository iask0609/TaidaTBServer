function transactionInfo(userId,transactionHash,callback)
{
//userId = 0;
var name = 'node' + userId;
var rpcport = String(8500 + parseInt(userId));
var port = String(30300 + parseInt(userId));

var website = "http://localhost:" + rpcport;

//var transactionHash = "0x01505988c59c27dca41821416b3a3d21f7567316074c238453807a6e879e478e";

var exec = require('child_process').exec;
var command = "geth --identity \"TestNode\" --rpc --rpcport \"" + rpcport + "\" --datadir " + name +  " --port \"" + port + "\" --rpcapi \"eth,web3,personal\" console";
//var command1 = "geth --rpcapi eth,web3,personal --rpc";
//exec(command,{cwd: '/home/suzy/文档/blockChain'});

var cp = exec(command
	,{cwd: '/home/suzy/文档/blockChain'});
						
						
setTimeout(()=>{
			var Web3 = require('web3');
			var web3 = new Web3(new Web3.providers.HttpProvider(website));
			var Eth = require('web3-eth');
			var eth = new Eth(website);
			//console.log(web3.eth.getAccounts);
			web3.eth.getAccounts().then();
			web3.eth.getTransactionReceipt(transactionHash).then(function(receipt){
                callback(receipt);
                console.log("交易区块编号："+receipt.blockNumber);
				console.log("交易区块Hash值："+receipt.blockHash);
				console.log("交易Hash值："+receipt.transactionHash);
				console.log("交易发送方地址："+ receipt.from);
			});		
			
},3000);

 setTimeout(()=>{
 		cp.kill();
 },5000);
}

exports.transactionInfo = transactionInfo;


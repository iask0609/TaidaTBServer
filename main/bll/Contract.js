var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc",net));
var eth=web3.eth;

var tokenContract = new web3.eth.Contract(MyTokenABI, null, {
    from: '0x1a9ec3b0b807464e6d3398a59d6b0a369bf422fa' // 目前web3没有api来解锁账户,只能自己事先解锁
});

tokenContract.deploy({
    data: MyTokenBin,
    arguments: [32222, 'token on web3',0,'web3']
}).send({
    from: '0x1a9ec3b0b807464e6d3398a59d6b0a369bf422fa',
    gas: 1500000,
    gasPrice: '30000000000000'
}, function(error, transactionHash){
    console.log("deploy tx hash:"+transactionHash)
})
    .on('error', function(error){ console.error(error) })
    .on('transactionHash', function(transactionHash){ console.log("hash:",transactionHash)})
    .on('receipt', function(receipt){
        console.log(receipt.contractAddress) // contains the new contract address
    })
    .on('confirmation', function(confirmationNumber, receipt){console.log("receipt,",receipt)})
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
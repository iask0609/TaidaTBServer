//这个部分应该是直接进行两两用户交易的
//到目前为止可以新建节点并新建账户 在控制台可以挖矿 并且可以执行交易
//当前函数的作用是transcation between two ramdom accounts
function transaction(){
    var exec = require('child_process').exec;
    var command = "geth --identity \"TestNode\" --rpc --rpcport \"8591\" --datadir data5 --port \"30307\" --nodiscover console";
    //这个command语句也是可以进行拼接的 需要前台给我这个用户的账号对应的文件名 这样可以获取这个人在链上的账号
    var child2 = exec(command
        ,{cwd: '/home/suzy/go1/go-ethereum/myprivatchain'},
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    var Web3 = require('web3');
    var web3 = new Web3('http://localhost:8591');
    var Eth = require('web3-eth');
    var eth = new Eth(Eth.givenProvider || 'http://localhost:8591');
    var Personal = require('web3-eth-personal');
    var personal = new Personal('http://localhost:8591');
    var accountList;
    web3.eth.getAccounts().then((res)=> {
        accountList = res;
    });
    // web3.eth.personal.unlockAccount('0x1132d04C51361bD75f9de88B3D07A5BbE07d70A9', '123456', 100)
    //     .then(function(res){
    //         console.log(res);
    //         haha = res;
    //     });
    //unlock
    web3.eth.sendTransaction({
        from: '0x1132d04C51361bD75f9de88B3D07A5BbE07d70A9',
        to: '0x6cBA8F5bb74098B2667ae8D8ffA62541A260418C',
        value: '5000000000000000'
    }).then(function(receipt){
            console.log(receipt);
            console.log('send:');
            findEth(send).then(function(result){
                console.log(result);
            });
            console.log('rec:')
            findEth(rece).then(function(result){
                console.log(result);
            });
        });
    //transfer
    web3.eth.accounts.signTransaction({
        to: '0x6cBA8F5bb74098B2667ae8D8ffA62541A260418C',
        value: 5000000000000000,
        gas: 2000000
    },'45aac2f38e67fa7916a0d06a6e79aaaaeb4786e9')
        .then(function(res){
            web3.eth.sendSignedTransaction(res.rawTransaction)
                .on('receipt', console.log);
        });


    //
    // let log = {
    //     time:(new Date).getTime(),
    //     type:"error",
    //     msg:"数据库连接失败"
    // };
    // let str = JSON.stringify(log);
    // let data = Buffer.from(str).toString('hex');
    // data = '0x'+data;
    // let coinbase = "0x1132d04C51361bD75f9de88B3D07A5BbE07d70A9";
    // let user1 = "0x6cBA8F5bb74098B2667ae8D8ffA62541A260418C";
    // web3.eth.personal.unlockAccount(coinbase, "coinbase");
    // let address = web3.eth.sendTransaction({
    //     from:coinbase,
    //     to:user1,
    //     value:5000000000000000,
    //     data:data
    // });
    // console.log(address);
    //
    // web3.eth.accounts.signTransaction({
    //     to: user1,
    //     value: 5000000000000000,
    //     gas: 2000000
    // },'45aac2f38e67fa7916a0d06a6e79aaaaeb4786e9')
    //     .then(function(res){
    //         web3.eth.sendSignedTransaction(res.rawTransaction)
    //             .on('receipt', console.log);
    //     });

}
exports.transaction = transaction;
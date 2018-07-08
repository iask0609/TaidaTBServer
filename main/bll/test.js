function open(userId){
    userId = 0;
    var name = 'data' + userId;
    var rpcport = String(8500 + parseInt(userId));
    var port = String(30300 + parseInt(userId));
    var command = "geth --identity \"TestNode\" --rpc --rpcport \"" + rpcport + "\" --datadir " + name +  " --port \"" + port + "\" --nodiscover console";
    var website = "http://localhost:" + rpcport;
    var path = "/home/suzy/go1/go-ethereum/myprivatchain/" + name + "/keystore";
    var path_extra = path + "/accounts1";
    var exec = require('child_process').exec;
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
    var web3 = new Web3(website);

    var version = web3.version;
    //console.log(version);
    //可以输出web3version
    var modules = web3.modules;
    var utils = web3.utils;
    var Eth = require('web3-eth');
    //web3.setProvider(new web3.providers.HttpProvider('http://localhost:8541'));
    var eth = new Eth(Eth.givenProvider || website);
    console.log(web3.currentProvider);
    var number = web3.eth.getBlockNumber();
    console.log(number);
    //输出区块数量
    //web3.eth.getBalance('0xd562934601c25D05F473c632D563ec50ccf2fB30').then(console.log);
    //查询账户余额
    //web3.eth.getAccounts(console.log);
    //到目前为止此函数可以启动节点并查看账户 之后只要把localhost换一下就可以了
    var Accounts = require('web3-eth-accounts');
    var accounts = new Accounts(website);
    var Personal = require('web3-eth-personal');
    var personal = new Personal(website);
    //web3.eth.personal.newAccount('123456').then(console.log);
    var account = web3.eth.accounts.create();
    var address = account.address;
    console.log(address);
    var info = web3.eth.accounts.encrypt(address, '123456');
    console.log(info);
    //到目前位置其实是已经创建账户了 但是还没有进行
    var info1 = "\"" + "address" + "\"" + ":" + "\"" + info.address + "\"";
    var info2 = "\"" + "crypto" + "\"";
    var info3 = "\"" + "cipher" + "\"" + ":" + "\"" + info.crypto.cipher + "\"";
    var info4 = "\"" + "ciphertext" + "\"" + ":" + "\"" + info.crypto.ciphertext + "\"";
    var info5 = "\"" + "cipherparams" + "\"";
    var info6 = "\"" + "iv" + "\"" + ":" + "\"" + info.crypto.cipherparams.iv + "\"";
    var info7 = "\"" + "kdf" + "\"" + ":" + "\"" + info.crypto.kdf + "\"";
    var info9 = "\"" + "kdfparams" + "\"";
    var info10 = "\"" + "dklen" + "\"" + ":" + info.crypto.kdfparams.dklen;
    var info11 = "\"" + "n" + "\"" + ":" + info.crypto.kdfparams.n;
    var info12 = "\"" + "p" + "\"" + ":" + info.crypto.kdfparams.p;
    var info13 = "\"" + "r" + "\"" + ":" + info.crypto.kdfparams.r;
    var info14 = "\"" + "salt" + "\"" + ":" + "\"" + info.crypto.kdfparams.salt + "\"";
    var info15 = "\"" + "mac" + "\"" + ":" + "\"" + info.crypto.mac + "\"";
    var info8 = "\"" + "id" + "\"" + ":" + "\"" + info.id + "\"";
    var info16 = "\"" + "version" + "\"" + ":" + info.version;
    var infofinal = "{" + info1 + "," + info2 + ":{" + info3 + "," + info4 + "," + info5 + ":{" + info6 + "}" + "," + info7 + "," + info9 + ":" + "{" + info10 + "," + info11 + "," + info12 + "," + info13 + "," + info14 + "}" + "," + info15 + "}" + "," + info8 + "," + info16 + "}";
    console.log(infofinal);
    //到目前位置已经创建好需要写到里边的文件了
    var child3 = exec('touch accounts1'
        ,{cwd: path},
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    //到目前位置是可以创造文件的 放入了keystore里边
    var fs = require('fs');
    fs.writeFile(path_extra, infofinal,  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        console.log("--------我是分割线-------------")
        console.log("读取写入的数据！");
        fs.readFile(path_extra, function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("异步读取文件数据: " + data.toString());
        });
    });
    //成功写入文件
    //至此可以创建并创建账户
    var hash = '0X' +info.address
    return hash

}
exports.open = open;
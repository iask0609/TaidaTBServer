function newData(){
    var exec = require('child_process').exec;

    var command = "geth --datadir data5 init genesis.json";
    //现在是创造节点 这个节点的地址可以根据用户自身独特的地址来设置
    var child1 = exec( command ,{cwd: '/home/suzy/go1/go-ethereum/myprivatchain'},
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    //此函数为创建节点 可以正常使用
    //目前需要和前台链接 并且使用某一参数为dataX 并全局累加
    //到这里是可以连接节点的 但是要结束的时候才能返回内容
}

exports.newData = newData;